import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://pangaea-interviews.now.sh/api/graphql',
    cache: new InMemoryCache(),
})

export const fetchProducts = (currency: string) => client.query({
    query: gql`
        query {
            products {
                id,
                title,
                image_url,
                price(currency: ${currency})
            }
        }
    `
})

export const fetchCurrencies = () => client.query({
    query: gql`
        query {
            currency
        }
    `
})