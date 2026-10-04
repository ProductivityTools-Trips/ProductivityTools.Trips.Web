import { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import service from '../../services/apiService'

const ISO = 'yyyy-MM-DD'

function JournalEdit() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const tripId = parseInt(searchParams.get('tripId'))
    const journalId = parseInt(searchParams.get('journalId'))
    const isEdit = !isNaN(journalId)

    const [trip, setTrip] = useState(null)
    const [journal, setJournal] = useState(
        isEdit ? null : { tripId, date: moment().format(ISO), notes: '' }
    )

    useEffect(() => {
        service.getTrip(tripId).then(setTrip)
    }, [tripId])

    useEffect(() => {
        if (isEdit) service.getJournal(journalId).then(setJournal)
    }, [isEdit, journalId])

    const set = (patch) => setJournal(prev => ({ ...prev, ...patch }))

    const back = `/tripdetail/${tripId}`
    const close = () => navigate(back, { replace: true })
    const save = async () => {
        if (journal.journalId) await service.updateJournal(journal)
        else await service.addJournal(journal)
        close()
    }

    return (
        <section className="page">
            <header className="page__header">
                <div>
                    <Link className="page__back" to={back}>← {trip?.name ?? 'Trip'}</Link>
                    <h1 className="page__title">{isEdit ? 'Edit note' : 'New note'}</h1>
                    {trip && <p className="page__subtitle">{trip.name}</p>}
                </div>
            </header>

            {journal && (
                <div className="card card--pad">
                    <div className="form">
                        <section className="form__section">
                            <div className="form__grid form__grid--2">
                                <div className="field">
                                    <span className="field__label">Date</span>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            inputFormat="YYYY.MM.DD"
                                            mask="____.__.__"
                                            value={journal.date ?? null}
                                            onChange={(v) => v && v.isValid() && set({ date: v.format(ISO) })}
                                            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="field">
                                <label className="field__label" htmlFor="j-notes">Notes</label>
                                <div className="field__input field__input--area">
                                    <textarea id="j-notes" rows={10} placeholder="What happened today…"
                                        value={journal.notes ?? ''} onChange={(e) => set({ notes: e.target.value })} autoFocus />
                                </div>
                            </div>
                        </section>

                        <footer className="form__footer">
                            <div />
                            <div className="form__footer-right">
                                <button type="button" className="btn btn--ghost" onClick={close}>Cancel</button>
                                <button type="button" className="btn btn--primary" onClick={save}>
                                    {isEdit ? 'Save changes' : 'Add note'}
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </section>
    )
}

export default JournalEdit