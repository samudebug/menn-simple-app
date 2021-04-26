import { Container, Button } from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import { getUserByName } from '../../controllers/user'
import { useState } from 'react';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await getUserByName(context.params.name as string);
    if (!data) return {notFound: true}
    return {
        props: {
            userData: data
        }
    }
}
export default function UserPage({userData}) {
    const [link, setLink] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const createShareLink = async () => {
        setSuccess(false);
        setError(false);
        try {
            const linkData = await axios.post("/api/users/create_link", {name: userData.name})
            console.log(linkData.data.link.shortLink);
            setSuccess(true);
            setLink(linkData.data.link.shortLink)
        } catch(error) {
            console.error(error);
            setError(true);
        }
    }
    return (
        <Container>
            <h2>This page is for {userData.name}</h2>
            <Button variant="primary" onClick={createShareLink}>Share</Button>

            {success ? (<h4>Use this link to open in the app: <a href={link}>{link}</a></h4>) : (<div></div>)}
            {error ? (<h4>An error has ocurred when generating the link</h4> ): (<div></div>)}
        </Container>
    );
}