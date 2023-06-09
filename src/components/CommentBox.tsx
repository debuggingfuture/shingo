import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const BasicTextFields = ({ profileId }: { profileId: string }) => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            {/* profile */}
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>
    );
}

export const CommentBox = () => {

    return (
        <div>
            <BasicTextFields profileId={""} />

        </div>
    )
}