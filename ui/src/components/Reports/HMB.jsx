import { Grid, Container, Snackbar, CircularProgress, useMediaQuery, TextField, Typography, CardContent, Card } from '@mui/material'
import { useState, useEffect } from 'react'

import { getCookie } from '../../lib/cookie';
import { apiHost, FhirApi } from '../../lib/api'
import InfoCard from '../InfoCard'

export default function LactationSupport({ results }) {

    let [open, setOpen] = useState(false)
    let [message, setMessage] = useState(false)

    let descriptions = {
        infantsOnDHM: "Infants on DHM",
        averageLengthOfDHMUse: "Average DHM use",
        totalDHMAvailable: "Total DHM available",
        infantsFullyReceivingDHM: "Infants fully receiving DHM",
        averageVolumeOfDHMUsePerDay: "Average volume of DHM use per day",
        infantsPartiallyReceivingDHM: "Infants partially receiving DHM",
    }

    let isMobile = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={e => { setOpen(false) }}
                message={message}
                key={"loginAlert"}
            />
            <br />
            <Container maxWidth="lg">
                {!results ?
                    <>
                        <Typography>Loading...</Typography>
                        <CircularProgress />
                    </>
                    :
                    <Grid container spacing={1} padding=".5em" >
                        
                        {(Object.keys(results).length > 0) ? Object.keys(results).map((report) => {
                            if (Object.keys(descriptions).indexOf(report) > -1) {
                                return <Grid item xs={12} md={12} lg={4}>
                                    <InfoCard value={results[report]} title={descriptions[report]} />
                                </Grid>
                            }

                        }) :
                            ((results.length > 0) && <Typography sx={{ textAlign: "center" }}>No reports defined</Typography>)
                        }
                        {(Object.keys(results).length > 0) &&
                            <>
                                <Grid item xs={12} md={12} lg={4}>
                                    <InfoCard value={results.totalVolumeOfDHM.parsteurized} title={"Pasteurized DHM Volume"} />
                                </Grid>
                                <Grid item xs={12} md={12} lg={4}>
                                    <InfoCard value={results.totalVolumeOfDHM.unParsteurized} title={"UnPasteurized DHM Volume"} />
                                </Grid>
                            </>
                        }
                    </Grid>}
            </Container>

        </>
    )

}




