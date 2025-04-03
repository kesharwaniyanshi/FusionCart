import { ButtonGroup, Button, styled } from "@mui/material"

const Component = styled(ButtonGroup)`
margin-top : 25px;
`;

export const GroupedButton = () => {
    return (
        <Component>
            <Button>-</Button>
            <Button>1</Button>
            <Button>+</Button>
        </Component>
    )
}