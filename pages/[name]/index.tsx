import { Container } from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import { getUserByName } from '../../controllers/user'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await getUserByName(context.params.name as string);
    console.log(data)
    if (!data) return {notFound: true}
    return {
        props: {
            userData: data
        }
    }
}
export default function UserPage({userData}) {
    return (
        <Container>
            <h2>This page is for {userData.name}</h2>
        </Container>
    );
}