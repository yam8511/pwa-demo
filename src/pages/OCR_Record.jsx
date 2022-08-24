import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'

const OcrRecord = () => {
    const [records, setRecords] = useState([])
    const get_record = async () => {
        const res = await fetch('/api/ocr')
        const data = await res.json()
        setRecords(data)
    }
    const clean_record = async () => {
        await fetch('/api/ocr', { method: 'DELETE' })
        setRecords([])
    }

    useEffect(
        () => {
            get_record()
        },
        []
    )

    const list = records.length > 0 ? records.map((record, i) => {
        const date = new Date(record.CreatedAt)
        return (
            <div className="w3-card-4" key={i + 1}>
                <div className="w3-container w3-justify">
                    <ul className="w3-ul">
                        <li>{`${date.getHours()}:${parseInt(date.getMinutes()) < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds()} (run: ${Math.round(record.Realtime * 1000) / 1000}s)`}</li>

                        {record.Result.map((txt, no) => <li>{no + 1}. {txt}</li>)}
                    </ul>
                </div>
            </div>
        )
    }) : <h1>No Records</h1>


    return (
        <div className="w3-center">
            <span className="w3-text-gray w3-margin-right">Only record 3 hours</span>
            {
                <button
                    className={`
                    ${records.length > 0 ? "" : "w3-disabled"}
                    w3-tiny
                    w3-btn
                    w3-border
                    w3-border-blue
                    w3-round
                `}
                    onClick={clean_record}
                >
                    <FontAwesomeIcon icon={faEraser} />
                    {' '}
                    Clear
                </button>
            }
            {list}
        </div>
    )
}

export default OcrRecord
