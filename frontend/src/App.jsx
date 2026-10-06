import { useEffect, useState } from 'react'

// The API's address comes from an environment variable (see .env.development).
const API_URL = import.meta.env.VITE_API_URL

const JobCard = ({ companyName, jobRole, jobStatus, jobId, jobDescription, resumeText, onStatusChange }) => {

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">{companyName}</h3>
            <h5 className="text-sm text-gray-600">{jobRole}</h5>
            <h6 className="mt-2 text-xs font-medium uppercase tracking-wide text-indigo-600">{jobStatus}</h6>
            
            <select className="mt-2 w-full rounded-md border border-gray-300 px-2 py-1 text-sm" value={jobStatus} onChange={(e)=>onStatusChange(jobId,e.target.value)}>
                <option>Applied</option>
                <option>Rejected</option>
                <option>Considering</option>
                <option>Ghosted</option>
                <option>Replied</option>
                <option>Interview</option>
            </select>

            {jobDescription && (
                <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm text-gray-700">{jobDescription}</p>
            )}
            {resumeText && (
                <details className="mt-2 text-sm">
                    <summary className="cursor-pointer text-indigo-600">Resume sent</summary>
                    <p className="mt-1 whitespace-pre-line text-gray-700">{resumeText}</p>
                </details>
            )}
        </div>
    )
}




const JobList = () => {

    const [jobArray, setJobArray] = useState([])
    const [companyName, setCompanyName] = useState("")
    const [jobRole, setJobRole] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [resumeText, setResumeText] = useState("")

    // Load the jobs from the server once, when JobList first appears.
    useEffect(() => {
        const loadJobs = async () => {
            const response = await fetch(`${API_URL}/jobs`)
            const data = await response.json()
            setJobArray(data)
        }
        loadJobs()
    }, [])



    const addJob = async (e) => {
        e.preventDefault()

        // Quick check for the user; the server's Pydantic model is the real one.
        if (!companyName.trim() || !jobRole.trim()) return

        const response = await fetch(`${API_URL}/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyName, jobRole, jobDescription, resumeText }),
        })
        if (!response.ok) return

        const savedJob = await response.json()
        setJobArray([...jobArray, savedJob])
        setCompanyName("")
        setJobRole("")
        setJobDescription("")
        setResumeText("")
    }
    const changeStatus = (jobId,newStatus) => {
        setJobArray(
            jobArray.map((job)=>job.jobId === jobId ? {...job,jobStatus:newStatus} : job 
            )
        )
    }



    return (
        <div className="space-y-4">

            {jobArray.map((item) => {

                return (<JobCard key={item.jobId} companyName={item.companyName} jobRole={item.jobRole} jobStatus={item.jobStatus} jobId={item.jobId} jobDescription={item.jobDescription} resumeText={item.resumeText} onStatusChange={changeStatus}></JobCard>)

            })}
            <div className="rounded-lg border border-dashed border-gray-300 p-4">
                <form className="space-y-2" onSubmit={addJob}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                        <h4 className="font-semibold text-gray-900 sm:mr-2">Add Job</h4>
                        <input className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm" type="text" value={companyName} placeholder='Company Name' onChange={(e) => setCompanyName(e.target.value)} />
                        <input className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm" type="text" value={jobRole} placeholder='Job Role' onChange={(e) => setJobRole(e.target.value)} />
                        <button className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700">Submit</button>
                    </div>
                    <textarea className="h-24 w-full rounded-md border border-gray-300 px-2 py-1 text-sm" value={jobDescription} placeholder='Paste the job description (optional)' onChange={(e) => setJobDescription(e.target.value)} />
                    <textarea className="h-24 w-full rounded-md border border-gray-300 px-2 py-1 text-sm" value={resumeText} placeholder='Paste the resume you sent (optional)' onChange={(e) => setResumeText(e.target.value)} />
                </form>



            </div>
        </div>

    )
}

const App = () => {
    return (
        <div className="mx-auto min-h-screen max-w-2xl bg-gray-50 p-6">
            <h1 className="mb-6 text-3xl font-bold text-gray-900"> Job Tracker </h1>
            <JobList></JobList>
        </div>

    )
}

export default App
