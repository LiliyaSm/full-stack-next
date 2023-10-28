import createApolloClient from "@/apollo-client";
import { gql } from "@apollo/client";
import { SimpleGrid } from "@chakra-ui/react";
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
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={3}>
      {characters.results.map(
        ({ name, image }: { name: string; image: string }) => (
          <Card key={name} alignItems="center" pb={5}>
            <CardHeader h="60px">
              <Heading fontSize="18px">{name}</Heading>
            </CardHeader>
            <Image src={image} alt={name} height={180} width={180} />
          </Card>
        )
      )}
    </SimpleGrid>
  );
}
