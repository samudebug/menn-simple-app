import { Container, Button } from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import { getUserByName } from '../../controllers/user'
import { useState, useEffect } from 'react';
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
    const [showDownloadLink, setShowDownloadLink] = useState(false);
    const [downloadLink, setDownloadLink] = useState("")
    useEffect(() => {
        const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isAndroid) {
            setDownloadLink("https://play.google.com/store/apps/details?id=com.instagram.android")
            setShowDownloadLink(true)
        } else if (isAndroid) {
            setDownloadLink("https://apps.apple.com/br/app/instagram/id389801252")
            setShowDownloadLink(true)
        }
    })
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

            {success ? (
            <div>
                <h4>Use this link to open in the app: <a href={link}>{link}</a></h4>
                
            </div>
            ) : (<div></div>)}
            {error ? (<h4>An error has ocurred when generating the link</h4> ): (<div></div>)}
            {showDownloadLink ? (<a href={downloadLink}><Button variant="primary">Download the App</Button></a>) : (<div></div>)}
        </Container>
    );
}