import React from "react"
import { Container, Table, Button } from 'react-bootstrap'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Nav from '../component/navs'
import { API } from "../config/api";
import { formatIDR } from "../component/format-number";

const fontcolor = "#BD0707"

export default function Admin() {
    let { data: trans } = useQuery("transactionsCache", async () => {
        const response = await API.get("/transactions");
        return response.data.data;
    });
    
    const navigate = useNavigate()
    // navigate("/transaction")

    return (
        <>
            <Nav />
            <Container className="p-5 mx-auto" style={{ color: fontcolor }}>
                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Post Code</th>
                            <th>Income</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trans?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.user?.name}</td>
                                <td>{item?.address}</td>
                                <td>{item?.postcode}</td>
                                <td className="text-primary">{formatIDR.format(item?.total)}</td>
                                <td className=
                                {
                                    item?.status === "Success"
                                      ? "text-success fw-bold"
                                      : item?.status === "Cancel"
                                      ? "text-danger fw-bold"
                                      : item?.status === "pending"
                                      ? "text-warning fw-bold"
                                      : ""
                                  }
                                >
                                    {item?.status}</td>
                                <td>{
                                    <div className="d-flex">
                                        <div className="">
                                            <Button variant="danger" className="mr-1">Cancel</Button>
                                        </div>

                                        <div className="mx-1">
                                            <Button variant="success">Approve</Button>
                                        </div>
                                    </div>
                                }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>

    )
}
