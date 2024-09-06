import { TextField } from '@mui/material';

type Props = {
    name: string;
    type: string;
    label: string;
};

const CustomizedInput = ({ name, type, label }: Props) => {
    return <TextField
        margin="normal"
        InputLabelProps={{ style: { color: "white" } }}
        name={name} type={type} label={label}
        InputProps={{
            style: {
                width: "400px",
                borderRadius: 10,
                fontSize: 20,
                color: "white",
            },
        }}
    />;
};

export default CustomizedInput;