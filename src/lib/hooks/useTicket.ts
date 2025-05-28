import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/apiRoutes";
interface TicketData {
    subject: string;
    message: string;
    department: string;
    priority?: string;
    last_reply?: string;
    attachments?: FileList | File[];
}
export interface Ticket {
    id: number;
    subject: string;
    contact: string;
    messages: {
        id: number;
        user_id: number;
        created_at: string;
        is_admin: number;
        message: string;
    }[];
    department: string;
    service?: string; // <-- Add this
    priority: string;
    status: string;
    porject?: string;
    last_reply: string;
}


export function useTicket() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any>(null);

    const createTicket = async (ticketData: TicketData, token: string | undefined) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const formData = new FormData();
            formData.append("subject", ticketData.subject);
            formData.append("message", ticketData.message);
            formData.append("department", ticketData.department);

            if (ticketData.priority) {
                formData.append("priority", ticketData.priority);
            }

            if (ticketData.attachments && ticketData.attachments.length > 0) {
                for (const file of ticketData.attachments) {
                    formData.append("attachments[]", file);
                }
            }

            const response = await fetch(`${API_BASE_URL}/ticket/create`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    // Do NOT set Content-Type header here for FormData
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Error: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
            setLoading(false);
            return result;
        } catch (err: any) {
            setError(err);
            setLoading(false);
            throw err; // rethrow if caller wants to catch
        }
    };

    return { createTicket, loading, error, data };
}


















// import { useState, useEffect } from "react";



export function useTicketList(token?: string) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTickets = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/tickets`, {
                headers: {
                    Accept: "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            console.log("Fetching tickets with token:", token);
            console.log("Raw response:", response);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Fetched ticket data:", data); // See what's actually returned
            setTickets(data?.tickets || []);
        } catch (err: any) {
            console.error("Error fetching tickets:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (token) fetchTickets();
    }, [token]);

    return { tickets, loading, error, refetch: fetchTickets };
}




