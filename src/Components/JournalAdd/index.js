import { Button, TextField } from "@mui/material";
import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import service from "../../services/apiService";

function JournalAdd() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = parseInt(searchParams.get("tripId"));


    const [journal, setjournal] = useState({ tripId: id });


    const journalChange = (newValue) => {
        setjournal(prevState => ({
            ...prevState, notes: newValue.target.value
        }))
    }

    const save = async () => {
        if (journal.journalId) {
            service.updateJournal(journal)
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
        navigate('/tripdetail/' + id, { replace: true })
    }
    
    const close = async () => {
        await save();
        navigate('/tripdetail/' + id, { replace: true })
    }

    return (
        <div>
            JournalAdd
            <p>tripId: {id}</p>
            <div><TextField label="journal" multiline value={journal.notes} onChange={journalChange} fullWidth></TextField></div>
            <Button variant="contained" onClick={saveAndClose}>Save & Close</Button>
            <Button variant="outlined" onClick={save}>Save</Button>
            <Button variant="outlined" onClick={close}>Close</Button>

        </div>

    )
}

export default JournalAdd;