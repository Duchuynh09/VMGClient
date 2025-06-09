// lib/getServerAxiosClient.ts
import axios from "axios"
import { cookies } from "next/headers"

export async function getServerAxiosClient() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const instance = axios.create({
    baseURL: "http://localhost:3001/vmg",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
  })

  return instance
}
