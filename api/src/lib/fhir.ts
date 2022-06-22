import {reports} from './reports.json'
import fetch from 'cross-fetch'

export let apiHost = "http://localhost:8080/fhir"

export let FhirApi = async (params:any) => {
    let _defaultHeaders = {
        "Content-Type": 'application/json'
    }
    if(!params.method){
        params.method = 'GET'
    }
    try {
        let response = await fetch(String(`${apiHost}${params.url}`), {
            headers: _defaultHeaders,
            method: params.method ? String(params.method) : 'GET',
            ...(params.method !== 'GET') && { body: String(params.data) }
        })
        let responseJSON = await response.json()
        let res = {
                status: "success",
                statusText: response.statusText,
                data: responseJSON
        }
        return res
    } catch (error) {
        console.error(error)
        let res = {
            statusText: "FHIRFetch: server error",
            status: "error",
            data: error
        }
        console.error(error)
        return res
    }
}

export let generateReport = async (name: any) => {
    //find report
    const reportName = name as keyof typeof reports
    let report = reports[reportName]

    console.log(report)
    let data = await FhirApi({
        url: report.q
    })
    if (data.status === 'success'){
        return data.data
    }
}