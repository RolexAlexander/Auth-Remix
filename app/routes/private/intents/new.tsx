import { Button, FormHelperText, Grid, IconButton, Stack, TextField, Typography } from "@mui/material"
import { Form, Link as NavLink, useActionData } from "@remix-run/react";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { HttpRequest } from "~/utils/jac/httpRequest";
import { getValidationErrors, IntentSchema } from "~/utils/jac/yup";

export const action: ActionFunction = async ({request}) => {
    let formData = Object.fromEntries(await request.formData());
    try {
        await IntentSchema.validate(formData, { abortEarly: false })
        let report = await HttpRequest("create_intent", formData)
        return redirect('/private/intents/' + report.report[0].jid);
    } catch (err) {
        const error = getValidationErrors(err)
        return { error };
    }
};


export default function IntentID() {
    const actionData = useActionData();

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
        >
            <Grid item >
                <Typography variant="h4" >
                    New Intent
                </Typography>
            </Grid>

            <Grid item justifyContent='right' >
                <IconButton color="primary" component={NavLink} to="/private/intents">
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Grid>

            <Grid item xs={12} marginTop={3}>
            <Form method='post'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                <Typography variant={'subtitle2'} >
                                    Enter your Intent
                                </Typography>
                                <TextField
                                    label="Intent *"
                                    variant="outlined"
                                    name={'name_of_intent'}
                                    fullWidth
                                />
                                {actionData?.error['name_of_intent'] && <FormHelperText id="component-error-text">{actionData?.error['name_of_intent']}</FormHelperText>}
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-end"
                                spacing={2}
                            >
                                <Button size={'large'} variant={'contained'} type="submit">
                                    Save
                                </Button>
                            </Stack>

                        </Grid>

                    </Grid>
                </Form>
            </Grid >

        </Grid >

    )
}
