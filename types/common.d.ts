import { History } from 'history'

interface RootProps {
    history: History;
}

interface HeadProps {
    title: string,
    description: string,
    url: string,
    title: string,
    ogImage?: string
}

interface GithubRepository {
    id: number
    stargazers_count: number
    full_name: string
    description: string
    html_url: string
}

interface GithubRepositories {
    total_count: number
    items: GithubRepository[]
}