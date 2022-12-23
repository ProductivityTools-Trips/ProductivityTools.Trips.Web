import { Button, TextField } from "@mui/material";
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import service from "../../services/apiService";

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';


function JournalEdit() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const tripId = parseInt(searchParams.get("tripId"));
    const journalId = parseInt(searchParams.get("journalId"));


    const [journal, setjournal] = useState({ tripId: tripId, journalId: journalId, date: moment() });

    useEffect(()=>{
        const getJournal=async ()=>{
            let data=await service.getJournal(journalId)
            console.log(data);
            setjournal(data);
        }
        debugger;
        if (journalId!=undefined)
        {
            getJournal();
        }
    },[journalId])

    const journalChange = (newValue) => {
        setjournal(prevState => ({
            ...prevState, notes: newValue.target.value
        }))
    }

    const save = async () => {
        if (journal.journalId) {
            await service.updateJournal(journal)
        }
        else {
            let data = await service.addJournal(journal)
            console.log(data);
            setjournal(prevState => ({
                ...prevState, journalId: data
            }))
        }
    }

    const saveAndClose = async () => {
        await save();
        await close();
    }

    const close = async () => {
        navigate('/tripdetail/' + tripId, { replace: true })
    }

    return (
        <div>
            JournalAdd
            <p>tripId: {tripId}</p>
            <p>journalId: {journalId}</p>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="Date"
                    value={journal.date}
                    onChange={(newValue) => {
                        console.log(newValue.format());
                        setjournal(prevState => ({
                            ...prevState, date: newValue.format('yyyy-MM-DD')
                        }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <div><TextField label="journal" multiline value={journal.notes} onChange={journalChange} fullWidth></TextField></div>
            <Button variant="contained" onClick={saveAndClose}>Save & Close</Button>
            <Button variant="outlined" onClick={save}>Save</Button>
            <Button variant="outlined" onClick={close}>Close</Button>

        </div>

    )
}

export default JournalEdit;