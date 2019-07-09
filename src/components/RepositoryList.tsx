import React from 'react'
import { Table } from 'semantic-ui-react'
import { GithubRepository } from '../../types/common'
import CenterLoader from '../components/CenterLoader'

const repositoryList: React.FC<{ items: GithubRepository[], total_count: number, isLoading: boolean }> = ({ items, total_count, isLoading }) => {
    const totalCountElem = items.length > 0 ? (<div>Total Count: {total_count}</div>) : (<></>)
    const table = items.length > 0 ? (
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Star</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>URL</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.full_name}</Table.Cell>
                        <Table.Cell>{item.stargazers_count}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell><a href={item.html_url}>{item.html_url}</a></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ) : (<></>)

    return (
        <>
            {totalCountElem}
            {table}
            <CenterLoader isLoading={isLoading}/>
        </>
    )
}

export default repositoryList