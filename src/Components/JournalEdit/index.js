import { Button, TextField } from "@mui/material";
import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import service from "../../services/apiService";

function JournalEdit() {


    const [searchParams, setSearchParams] = useSearchParams();
    const id = parseInt(searchParams.get("tripId"));


    const [journal, setjournal] = useState({ tripId: id });


    const journalChange = (newValue) => {
        setjournal(prevState => ({
            ...prevState, notes: newValue.target.value
        }))
    }

    const save = () => {
        if (journal.journalId) {
            service.updateJournal(journal)
        }
        else {
            let id = service.saveJournal(journal)
            setjournal(prevState => ({
                ...prevState, journalId: id
            }))
        }
    }

    return (
        <div>
            JournalAdd
            <p>tripId: {id}</p>
            <p><TextField label="journal" multiline value={journal} onChange={journalChange} fullWidth></TextField></p>
            <Button variant="contained" onClick={save}>Save</Button>
        </div>
    )
}

export default JournalEdit;