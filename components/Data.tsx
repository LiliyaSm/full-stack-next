import createApolloClient from "@/apollo-client";
import { gql } from "@apollo/client";
import { Grid } from "@chakra-ui/react";
import Image from "next/image";
import { Card, CardHeader, Heading } from "@chakra-ui/react";

const client = createApolloClient();

export default async function Data() {
  const {
    data: { characters },
  } = await client.query({
    query: gql`
      query Query {
        characters {
          results {
            name
            image
          }
        }
      }
    `,
  });

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
      {characters.results.map(
        ({ name, image }: { name: string; image: string }) => (
          <Card key={name} alignItems="center">
            <CardHeader>
              <Heading size="md">{name}</Heading>
            </CardHeader>
            <Image src={image} alt={name} height={180} width={180} />
          </Card>
        )
      )}
    </Grid>
  );
}
