"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import TableSection from "@/components/tableSection"
import { API_BASE_URL } from "@/lib/utils/apiRoutes"

export default function DevicesPage() {
  const { data: session } = useSession();
  const [deviceData, setDeviceData] = useState<any[]>([]);



const handleRemoveDevice= (deviceId: string) => {
  console.log("Removing device with ID:", deviceId);

  axios.delete(`${API_BASE_URL}/devices/${deviceId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(session?.user as any)?.access_token}`,
    },
  }).then((response) => {
    console.log("Device removed successfully:", response.data);
    setDeviceData((prevData) => prevData.filter(device => device[0] !== `#${deviceId}`));
  }).catch((error) => {
    console.error("Error removing device:", error);
  });
}

  useEffect(() => {
    const token = (session?.user as any)?.access_token;

    if (!token) return;

    axios.get(`${API_BASE_URL}/devices`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Devices fetched successfully:", response.data);

      const devices = response.data.devices || [];

      const formattedData = devices.map((device: any, index: number) => [
        `#${device.id}`,
        <div className="flex items-center justify-between gap-2" key={device.id}>
          <span>{device.device_name || "Unnamed Device"}</span>
          <button
            onClick={() => handleRemoveDevice(device.id)}
            className="text-white bg-red-600 px-4 border-2 rounded-2xl py-2 hover:underline text-xs"
          >
            Remove
          </button>
        </div>,
        device.last_active_at || "N/A",
      ]);

      setDeviceData(formattedData);
    })
    .catch((error) => {
      console.error("Error fetching devices:", error);
    });
  }, [session]);

  return (
    <div className="p-4 lg:px-20 bg-slate-50 min-h-screen lg:text-sm text-gray-700 space-y-8">
      <TableSection
        title="My devices"
        actionLabel="+ Add more Devices"
        searchable
        pagination
        columns={['Device ID #', 'Devices', 'Last Reply']}
        data={deviceData}
        removeBtn
        highlightColumns={[0, 1]}
      />
    </div>
  );
}
