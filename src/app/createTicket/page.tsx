"use client";

import FormLabel from "@/components/ui/FormLabel";
import { FormInput } from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormTextarea from "@/components/ui/FormTextarea";
import FormButton from "@/components/ui/FormButton";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
// import { useTicket } from "@/hooks/useTicket"; // adjust this path if needed
import { useTicket } from "@/lib/hooks/useTicket";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HOME_PAGE_PATH } from "@/lib/pathname";


export default function CreateTicketPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: session } = useSession();
  const { createTicket, loading, error, data } = useTicket();
  const router = useRouter();
  const onSubmit = async (formData: any) => {
    try {
      const token = (session?.user as any)?.access_token;
      await createTicket(
        {
          subject: formData.subject,
          message: formData.body,
          department: formData.department,
          priority: formData.priority,
          attachments: formData.attachment,
        },
        token
      );
      toast.success("Ticket created successfully!");
      router.push(HOME_PAGE_PATH);
      reset();
    } catch {
      alert("Failed to create ticket. Please try again.");
    }
  };

  return (
    <div className="p-4 lg:px-20 bg-slate-50 min-h-screen text-slate-900 space-y-8">
      <h2 className="text-lg font-bold text-slate-600">Open a ticket</h2>

      <form
        className="space-y-6 bg-white p-6 rounded-md shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Subject */}
        <div>
          <FormLabel htmlFor="subject" className={errors.subject ? "text-red-600" : ""}>
            Subject
          </FormLabel>
          <FormInput
            id="subject"
            placeholder="Enter subject"
            registration={register("subject", { required: "Subject is required" })}
            error={errors.subject}
            className="bg-slate-100 mt-1 px-3 py-2"
          />
        </div>

        {/* Department & Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormLabel htmlFor="department" className={errors.department ? "text-red-600" : ""}>
              Department
            </FormLabel>
            <FormSelect
              id="department"
              label="department"
              options={[
                { value: "Marketing", label: "Marketing" },
                { value: "IT", label: "IT" },
                { value: "HR", label: "HR" },
                { value: "Sales", label: "Sales" },
                { value: "Technical Support", label: "Technical Support" },
              ]}
              registration={register("department", { required: "Department is required" })}
              error={errors.department}
              className="bg-slate-100 mt-1 border-slate-100"
            />
          </div>

          <div>
            <FormLabel htmlFor="priority">Priority</FormLabel>
            <FormSelect
              id="priority"
              label="priority"
              options={[
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
              ]}
              registration={register("priority", { required: "Priority is required" })}
              error={errors.priority}
              className="bg-slate-50 mt-1 border-slate-100"
            />

          </div>
        </div>

        {/* Ticket Body */}
        <div>
          <FormLabel htmlFor="body" className={errors.body ? "text-red-600" : ""}>
            Ticket Body
          </FormLabel>
          <FormTextarea
            id="body"
            placeholder="I have an issue"
            rows={4}
            registration={register("body", { required: "Ticket body is required" })}
            error={errors.body}
            className="bg-slate-100 mt-1"
          />
        </div>

        {/* Attachments */}
        <div>
          <FormLabel htmlFor="attachment" className={errors.attachment ? "text-red-600" : ""}>
            Attachments
          </FormLabel>
          <div className="flex lg:w-80 border border-gray-300 rounded-md overflow-hidden">
            <input
              type="file"
              {...register("attachment")}
              name="attachment"
              multiple
              className="text-sm px-2 py-1 focus:outline-none"
            />
            <button
              type="button"
              onClick={() =>
                document.querySelector<HTMLInputElement>('input[name="attachment"]')?.click()
              }
              className="text-sm px-3 py-1 border-l border-gray-300 bg-white"
            >
              +
            </button>
          </div>

          {errors.attachment && (
            <p className="text-sm text-red-600 mt-1">
              {typeof errors.attachment.message === "string" ? errors.attachment.message : null}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 text-right">
          <FormButton
            type="submit"
            label={loading ? "Saving..." : "Save"}
            className="bg-slate-900 hover:bg-blue-700 text-sm px-8 rounded-md"
            disabled={loading}
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-600 mt-2">Error: {error.message || "Unknown error"}</p>
        )}

        {/* Success message */}
        {data && (
          <p className="text-green-600 mt-2">
            Ticket created with ID: {data.id || JSON.stringify(data)}
          </p>
        )}
      </form>
    </div>
  );
}
