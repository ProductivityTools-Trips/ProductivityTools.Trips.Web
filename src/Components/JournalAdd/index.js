import { Button, TextField } from "@mui/material";
import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import service from "../../services/apiService";

function JournalAdd() {


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

    return (
        <div>
            JournalAdd
            <p>tripId: {id}</p>
            <div><TextField label="journal" multiline value={journal.notes} onChange={journalChange} fullWidth></TextField></div>
            <Button variant="contained" onClick={save}>Save</Button>
        </div>
    )
}

export default JournalAdd;