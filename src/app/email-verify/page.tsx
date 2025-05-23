



import EmailVerificationPage from "@/components/EmailVerificationPage";
import { Suspense } from "react";

export const metadata = {
  title: "Email Verification",
};

const Page: React.FC = () => (
  <Suspense>
  <EmailVerificationPage/>
  </Suspense>
);

export default Page;
