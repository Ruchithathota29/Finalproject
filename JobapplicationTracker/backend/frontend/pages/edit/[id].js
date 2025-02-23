import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/edit.module.css';

export default function EditApplication() {
    const router = useRouter();
    const { id } = router.query;
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState('');
    const [applicationDate, setApplicationDate] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:5000/api/applications/${id}`)
                .then((response) => {
                    const application = response.data;
                    setCompany(application.company);
                    setPosition(application.position);
                    setStatus(application.status);
                    setApplicationDate(application.applicationDate.split('T')[0]);
                    setFollowUpDate(application.followUpDate?.split('T')[0] || '');
                    setNotes(application.notes || '');
                })
                .catch((error) => {
                    console.error('Error fetching application data:', error);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedApplication = {
                company,
                position,
                status,
                applicationDate,
                followUpDate,
                notes,
            };

            await axios.put(`http://localhost:5000/api/applications/${id}`, updatedApplication);

            router.push('/');
        } catch (error) {
            console.error('Error updating job application:', error);
        }
    };

    return (
        <div className={styles['form-container']}>
            <h1>Edit Job Application</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company:</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
                </div>
                <div>
                    <label>Position:</label>
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="Applied">Applied</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Offer Received">Offer Received</option>
                    </select>
                </div>
                <div>
                    <label>Application Date:</label>
                    <input type="date" value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} required />
                </div>
                <div>
                    <label>Follow-up Date:</label>
                    <input type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                </div>
                <button type="submit">Update Application</button>
            </form>
        </div>
    );
}
