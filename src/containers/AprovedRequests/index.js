import { Container, Col, Row, Table } from "react-bootstrap";
import "./css/style.css"
import { collection, getDocs, db, updateDoc, doc,where ,query,deleteDoc} from "../../confiq/Firebase.js";
import { useEffect, useState } from "react";





let ApprovedRequests = () => {
    const [allData, setAllData] = useState([]);
    useEffect(async () => {
        let arr = [];
        const q = query(collection(db, "requests"),where("status", "==", "approve"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        setAllData(arr)
    }, [allData])
    let del = async (uid) => {
        const status = doc(db, "requests", uid);
        await deleteDoc(status);
    }

    return (
        <>
            <Container fluid className='aboutMain'>
                <Row>
                    <Col xs={{ span: 12, order: "last" }} sm={{ span: 12, order: "last" }} md={{ span: 12, order: "first" }} lg={{ span: 12, order: "first" }} className="headingMain">
                        <h1 className="heading1">Approved Requests</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Cnic Number</th>
                                    <th>Request Type</th>
                                    <th>Status</th>
                                    <th></th>




                                </tr>
                            </thead>
                            <tbody>

                                {allData.map((v, i) => {
                                    return (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{v.name}</td>
                                            <td>{v.cnic}</td>
                                            <td>{v.type}</td>
                                            <td>{v.status}</td>
                                            <td><button onClick={() => del(v.uid)}>Delete</button></td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ApprovedRequests;