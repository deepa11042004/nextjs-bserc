"use client"

import React, { useState } from "react"

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000").replace(/\/$/, "")

function ResultBox({ title, data }: { title: string; data: any }) {
  return (
    <div className="mt-4 p-3 rounded-md bg-slate-900 border border-slate-800">
      <div className="text-sm text-gray-300 font-medium mb-2">{title}</div>
      <pre className="text-xs text-gray-200 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default function MailingPage() {
  const [tab, setTab] = useState<"single" | "bulk_raw" | "bulk_auto" | "bulk_template" | "logs">("single")

  // Single
  const [singleEmail, setSingleEmail] = useState("")
  const [singleSubject, setSingleSubject] = useState("")
  const [singleBody, setSingleBody] = useState("")
  const [singleResult, setSingleResult] = useState<any>(null)

  // Bulk raw
  const [rawTable, setRawTable] = useState("")
  const [rawEmailColumn, setRawEmailColumn] = useState("email")
  const [rawSubject, setRawSubject] = useState("")
  const [rawBody, setRawBody] = useState("")
  const [rawResult, setRawResult] = useState<any>(null)

  // Bulk auto
  const [autoTable, setAutoTable] = useState("")
  const [autoEmailColumn, setAutoEmailColumn] = useState("email")
  const [autoFirstCol, setAutoFirstCol] = useState("first_name")
  const [autoLastCol, setAutoLastCol] = useState("last_name")
  const [autoSubject, setAutoSubject] = useState("")
  const [autoResult, setAutoResult] = useState<any>(null)

  // Bulk template
  const [templateId, setTemplateId] = useState("")
  const [templateTable, setTemplateTable] = useState("")
  const [templateEmailCol, setTemplateEmailCol] = useState("email")
  const [templateMapping, setTemplateMapping] = useState('{"first_name":"first_name","last_name":"last_name","email":"email"}')
  const [templateResult, setTemplateResult] = useState<any>(null)

  // Logs / Status
  const [queryJobId, setQueryJobId] = useState("")
  const [jobStatusResult, setJobStatusResult] = useState<any>(null)
  const [queryEmail, setQueryEmail] = useState("")
  const [emailLogsResult, setEmailLogsResult] = useState<any>(null)

  async function postJson(path: string, body: any) {
    const res = await fetch(API_BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    return res.json()
  }

  async function handleSingleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const json = await postJson("/mail/single", { email: singleEmail, subject: singleSubject, body: singleBody })
    setSingleResult(json)
  }

  async function handleRawSubmit(e: React.FormEvent) {
    e.preventDefault()
    const json = await postJson("/mail/bulk/raw", { table_name: rawTable, email_column: rawEmailColumn, subject: rawSubject, body: rawBody })
    setRawResult(json)
  }

  async function handleAutoSubmit(e: React.FormEvent) {
    e.preventDefault()
    const json = await postJson("/mail/bulk/auto", { table_name: autoTable, email_column: autoEmailColumn, first_name_column: autoFirstCol, last_name_column: autoLastCol, subject: autoSubject })
    setAutoResult(json)
  }

  async function handleTemplateSubmit(e: React.FormEvent) {
    e.preventDefault()
    let mapping
    try {
      mapping = JSON.parse(templateMapping)
    } catch (err) {
      setTemplateResult({ error: "Invalid JSON for column mapping" })
      return
    }

    const json = await postJson("/mail/bulk/template", { template_id: Number(templateId), table_name: templateTable, email_column: templateEmailCol, column_mapping: mapping })
    setTemplateResult(json)
  }

  async function fetchJobStatus() {
    if (!queryJobId) return
    const res = await fetch(API_BASE + "/mail/status/" + encodeURIComponent(queryJobId))
    const json = await res.json()
    setJobStatusResult(json)
  }

  async function fetchEmailLogs() {
    if (!queryEmail) return
    const res = await fetch(API_BASE + "/mail/logs?email=" + encodeURIComponent(queryEmail) + "&limit=20")
    const json = await res.json()
    setEmailLogsResult(json)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white">Mailing</h1>
      <p className="text-sm text-gray-400 mt-1">Send single or bulk emails using the backend bulk-mail service.</p>

      <div className="mt-6 flex space-x-2">
        <button onClick={() => setTab("single")} className={`px-3 py-1 rounded ${tab === "single" ? "bg-[#1F1F23] text-white" : "text-gray-300 bg-slate-800"}`}>Single</button>
        <button onClick={() => setTab("bulk_raw")} className={`px-3 py-1 rounded ${tab === "bulk_raw" ? "bg-[#1F1F23] text-white" : "text-gray-300 bg-slate-800"}`}>Bulk Raw</button>
        <button onClick={() => setTab("bulk_auto")} className={`px-3 py-1 rounded ${tab === "bulk_auto" ? "bg-[#1F1F23] text-white" : "text-gray-300 bg-slate-800"}`}>Bulk Auto</button>
        <button onClick={() => setTab("bulk_template")} className={`px-3 py-1 rounded ${tab === "bulk_template" ? "bg-[#1F1F23] text-white" : "text-gray-300 bg-slate-800"}`}>Bulk Template</button>
        <button onClick={() => setTab("logs")} className={`px-3 py-1 rounded ${tab === "logs" ? "bg-[#1F1F23] text-white" : "text-gray-300 bg-slate-800"}`}>Logs / Status</button>
      </div>

      <div className="mt-6">
        {tab === "single" && (
          <form onSubmit={handleSingleSubmit} className="space-y-3 max-w-2xl">
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input value={singleEmail} onChange={(e) => setSingleEmail(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-300">Subject</label>
              <input value={singleSubject} onChange={(e) => setSingleSubject(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-300">Body (HTML)</label>
              <textarea value={singleBody} onChange={(e) => setSingleBody(e.target.value)} rows={6} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <button className="px-4 py-2 bg-indigo-600 rounded text-white">Send Single</button>
            </div>
            {singleResult && <ResultBox title="Response" data={singleResult} />}
          </form>
        )}

        {tab === "bulk_raw" && (
          <form onSubmit={handleRawSubmit} className="space-y-3 max-w-2xl">
            <div>
              <label className="text-sm text-gray-300">Table Name</label>
              <input value={rawTable} onChange={(e) => setRawTable(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-300">Email Column</label>
              <input value={rawEmailColumn} onChange={(e) => setRawEmailColumn(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-300">Subject</label>
              <input value={rawSubject} onChange={(e) => setRawSubject(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-300">Body (HTML)</label>
              <textarea value={rawBody} onChange={(e) => setRawBody(e.target.value)} rows={6} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <button className="px-4 py-2 bg-indigo-600 rounded text-white">Queue Bulk Raw</button>
            </div>
            {rawResult && <ResultBox title="Response" data={rawResult} />}
          </form>
        )}

        {tab === "bulk_auto" && (
          <form onSubmit={handleAutoSubmit} className="space-y-3 max-w-2xl">
            <div>
              <label className="text-sm text-gray-300">Table Name</label>
              <input value={autoTable} onChange={(e) => setAutoTable(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-gray-300">Email Column</label>
                <input value={autoEmailColumn} onChange={(e) => setAutoEmailColumn(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">First Name Column</label>
                <input value={autoFirstCol} onChange={(e) => setAutoFirstCol(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Last Name Column</label>
                <input value={autoLastCol} onChange={(e) => setAutoLastCol(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-300">Subject</label>
              <input value={autoSubject} onChange={(e) => setAutoSubject(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <button className="px-4 py-2 bg-indigo-600 rounded text-white">Queue Bulk Auto</button>
            </div>
            {autoResult && <ResultBox title="Response" data={autoResult} />}
          </form>
        )}

        {tab === "bulk_template" && (
          <form onSubmit={handleTemplateSubmit} className="space-y-3 max-w-2xl">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-gray-300">Template ID</label>
                <input value={templateId} onChange={(e) => setTemplateId(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Table Name</label>
                <input value={templateTable} onChange={(e) => setTemplateTable(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Email Column</label>
                <input value={templateEmailCol} onChange={(e) => setTemplateEmailCol(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-300">Column Mapping (JSON)</label>
              <textarea value={templateMapping} onChange={(e) => setTemplateMapping(e.target.value)} rows={6} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <button className="px-4 py-2 bg-indigo-600 rounded text-white">Queue Bulk Template</button>
            </div>
            {templateResult && <ResultBox title="Response" data={templateResult} />}
          </form>
        )}

        {tab === "logs" && (
          <div className="space-y-3 max-w-2xl">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-gray-300">Job ID</label>
                <input value={queryJobId} onChange={(e) => setQueryJobId(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
                <button onClick={fetchJobStatus} className="mt-2 px-3 py-1 bg-indigo-600 rounded text-white">Get Job Status</button>
                {jobStatusResult && <ResultBox title="Job Status" data={jobStatusResult} />}
              </div>
              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input value={queryEmail} onChange={(e) => setQueryEmail(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-700 text-white" />
                <button onClick={fetchEmailLogs} className="mt-2 px-3 py-1 bg-indigo-600 rounded text-white">Get Email Logs</button>
                {emailLogsResult && <ResultBox title="Email Logs" data={emailLogsResult} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
