import { Container, Col, Row, Table } from "react-bootstrap";
import "./css/style.css"
import { collection, getDocs, db,updateDoc,doc } from "../../confiq/Firebase.js";
import { useEffect, useState } from "react";
import { BasicButtons, BasicModal, ResetModal } from "../../components";





let Users = () => {
    const [allData, setAllData] = useState([]);
    useEffect(async () => {
        let arr = [];
        const querySnapshot = await getDocs(collection(db, "branch"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            arr.push(doc.data());
            console.log(arr);

           
        });
        setAllData(arr)
    }, [])

    let approve=async(uid)=>{
        const status = doc(db, "branch",uid );
        await updateDoc(status, {
            status: "branch"
          });
    }

    

    return (
        <>
            <Container fluid className='aboutMain'>
                <Row>
                    <Col xs={{ span: 12, order: "last" }} sm={{ span: 12, order: "last" }} md={{ span: 12, order: "first" }} lg={{ span: 12, order: "first" }} className="headingMain">
                        <h1 className="heading1">Branches Users</h1>
                        
                        <BasicModal>Add User</BasicModal>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Branch Name</th>
                                    <th>Position</th>
                                    <th>Edit</th>
                                    
                                </tr>
                                { console.log(allData)}
                            </thead>
                            <tbody>

                                {allData.map((v, i) => {
                                    return (
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>{v.firstName}</td>
                                            <td>{v.lastName}</td>
                                            <td>{v.branchName}</td>
                                            <td>{v.post}</td>
                                            {/* <td><button onClick={()=>edit(v.uid)}>Edit</button></td> */}
                                            <td><ResetModal>Reset</ResetModal></td>

                                            <td><button>Delete</button></td>
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

export default Users;