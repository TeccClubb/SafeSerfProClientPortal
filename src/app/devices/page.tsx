"use client"

import { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import TableSection from "@/components/tableSection"
import { API_BASE_URL } from "@/lib/utils/apiRoutes"

export default function DevicesPage() {
  const { data: session } = useSession()
  const [rawDevices, setRawDevices] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const token = (session?.user as any)?.access_token

  const handleRemoveDevice = (deviceId: string) => {
    if (!token) return

    axios
      .delete(`${API_BASE_URL}/devices/${deviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        const updatedDevices = rawDevices.filter((d) => d.id !== parseInt(deviceId))
        setRawDevices(updatedDevices)
      })
      .catch((error) => {
        console.error("Error removing device:", error)
      })
  }

  const formatDeviceRow = (device: any) => [
    `#${device.id}`,
    <div className="flex items-center justify-between gap-2" key={device.id}>
      <span>{device.device_name || device.ip_address || "Unnamed Device"}</span>
      <button
        onClick={() => handleRemoveDevice(device.id)}
        className="text-white bg-red-600 px-4 border-2 rounded-2xl py-2 hover:underline text-xs"
      >
        Remove
      </button>
    </div>,
    device.last_active_at || "N/A",
  ]

  useEffect(() => {
    if (!token) return

    axios
      .get(`${API_BASE_URL}/devices`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRawDevices(res.data.devices || [])
      })
      .catch((error) => {
        console.error("Error fetching devices:", error)
      })
  }, [token])

  const filteredDeviceRows = useMemo(() => {
    if (!searchTerm.trim()) return rawDevices.map(formatDeviceRow)

    const lowerSearch = searchTerm.toLowerCase()
    return rawDevices
      .filter((device) => {
        return (
          `#${device.id}`.toLowerCase().includes(lowerSearch) ||
          (device.device_name || "").toLowerCase().includes(lowerSearch) ||
          (device.ip_address || "").toLowerCase().includes(lowerSearch)
        )
      })
      .map(formatDeviceRow)
  }, [rawDevices, searchTerm])

  return (
    <div className="p-4 lg:px-20 bg-slate-50 min-h-screen lg:text-sm text-gray-700 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Devices</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search device..."
          className="border px-3 py-1 rounded text-sm"
        />
      </div>

      <TableSection
        title=""
        actionLabel="+ Add more Devices"
        searchable={false}
        pagination
        columns={["Device ID #", "Devices", "Last Reply"]}
        data={filteredDeviceRows}
        removeBtn
        highlightColumns={[0, 1]}
      />
    </div>
  )
}
