import React, {useEffect, useState} from "react";
import { useSearchParams } from 'react-router-dom';

import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Flex, Avatar, Box } from '@chakra-ui/react'
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";


const ADD_MESSAGE = gql`
    mutation MyMutation($message: String!, $from_email: String!, $to_email: String!) {
        insert_messages_one(object: {from_email: $from_email, message: $message, to_email: $to_email}) {
            from_email
            message
            to_id
            to_email
        }
    }
`;

const GET_MESSAGES = gql`
    subscription MySubscription {
        messages {
            id
            message
        }
    }
`;

// CREATE FUNCTION check_author_active()
//     RETURNS trigger AS $BODY$
//     BEGIN
//     SELECT id INTO NEW.to_id FROM users WHERE email = NEW.to_email;
//     RETURN NEW;
//     END;
//     $BODY$ LANGUAGE plpgsql;

// CREATE TRIGGER insert_article BEFORE INSERT OR UPDATE ON messages FOR EACH ROW EXECUTE PROCEDURE check_author_active();


export default function DrawerExample() {
    const [searchParams] = useSearchParams();
    const [messages, setMessages] = useState([]);
    console.log(searchParams.get('email')); // ▶ URLSearchParams {}
    const currentUser = "kaushik@moneysave.io";
    const { data, loading } = useSubscription(GET_MESSAGES);
    console.log("messages: ", data, loading);
    const [addMessage, { messages_mutate, message_loading }] = useMutation(ADD_MESSAGE);
    const senderAddress = searchParams.get('email');
    const [message, setMessage] = useState("");
    const sendMessage = (text, from_email, to_email) => {
        addMessage({ variables: { message: text, from_email: from_email, to_email: to_email } });
    }
    useEffect(() => {
        if (data && data.messages.length) {
            setMessages(data?.messages);
        }
    }, [data])
    return (
      <>
        <div className="message-body">
            <div className="messages">
                {
                    messages.map((message) => {
                        return (
                            <div key={message.id} className={message.to_email == currentUser ? "message-received" : "message-sent"} m={4}>
                                <div className="message-text">
                                    <Card>
                                        <CardHeader>
                                            <Flex spacing='4'>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            
                                                <Box>
                                                <Heading size='sm'>Segun Adebayo</Heading>
                                                <Text>Creator, Chakra UI</Text>
                                                </Box>
                                            </Flex>
                                            </Flex>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{message.message}</Text>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
            <div className="main-bottom">
                <Input m={2} placeholder='Basic usage' onChange={(e) => {setMessage(e.target.value)}}/>
                <Button m={2} colorScheme='blue' onClick={() => {sendMessage(message, "kaushik@rocketgraph.io", "kaushik");}}>Button</Button>
            </div>
        </div>
      </>
    )
}