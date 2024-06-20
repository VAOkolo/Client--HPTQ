import React from "react"
import { NavLink } from "react-router-dom"
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Heading,
  Spacer,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { AnimatedLink } from "../../animations/animatedLink"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"

const Links = [
  { title: "Home", linkTo: "/" },
  { title: "Rules", linkTo: "/rules" },
  { title: "Leaderboard", linkTo: "/leaderboard" },
]

const NavigationLink = ({ linkTo, title }) => (
  <AnimatedLink>
    <NavLink to={linkTo}>{title}</NavLink>
  </AnimatedLink>
)

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      px={4}
      bg='linear-gradient( 135deg, #845EC2 10%, #D65DB1 100%)'
      fontSize={["lg", "xl", "2xl"]}
      fontWeight='bold'
    >
      <Flex h={"10vh"} alignItems={"center"} justifyContent={"space-between"}>
        <Heading
          display='flex'
          as={motion.h1}
          fontSize={["2xl", "4xl", "4xl"]}
          bgClip='text'
          letterSpacing={2}
          initial={{ opacity: 0, y: -220 }}
          animate={{ opacity: 1, y: 0 }}
          transition='1s fade-in'
          p={3}
          color='white'
          fontFamily='Amatic SC'
        >
          I Doodle
        </Heading>
        <Spacer />
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={6} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavigationLink
                key={link.title}
                linkTo={link.linkTo}
                title={link.title}
              />
            ))}
          </HStack>
        </HStack>
        <IconButton
          size={"md"}
          colorScheme='whiteAlpha'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }} w={"100%"}>
          <Stack as={"nav"} spacing={4} px={10}>
            {Links.map((link) => (
              <NavigationLink
                key={link.title}
                linkTo={link.linkTo}
                title={link.title}
              />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default NavBar

/* 
<Flex
      as={motion.nav}
      bg='linear-gradient( 135deg, #845EC2 10%, #D65DB1 100%)'
      minH={"10vh"}
      px={6}
      py={3}
      boxShadow='0px 1px 10px #999'
      justifyContent={["center", "space-between"]}
      alignItems='center'
      initial={{ opacity: 0.33 }}
      animate={{ opacity: 1 }}
      transition='1.3s ease-in-out'
      _hover={{ transform: "scale(1)", filter: "brightness(105%)" }}
      flexDirection={["row", "row", "column", "row"]}
      shrink='1'
      fontFamily='Amatic SC'
      fontSize={["lg", "xl", "2xl"]}
      fontWeight='bold'
    >
      <Flex
        alignSelf={["center", "start", "start", "center"]}
        mb={{ md: "5px" }}
      >
        <Heading
          display='flex'
          as={motion.h1}
          fontSize={["2xl", "3xl", "4xl"]}
          bgClip='text'
          letterSpacing={2}
          initial={{ opacity: 0, y: -220 }}
          animate={{ opacity: 1, y: 0 }}
          transition='1s fade-in'
          p={3}
          order={["2", "1", "1", "1"]}
          color='white'
          fontFamily='Amatic SC'
        >
          I Doodle
        </Heading>
      </Flex>
      <Flex
        as='ul'
        alignItems='space-between'
        justifyContent='space-between'
        minW='30%'
        p={1}
        mr={5}
        mt={["3%", "0"]}
        display={["none", "none", "flex"]}
        order={["2", "1"]}
        minWidth={{ sm: "70vw", md: "90vw", lg: "30vw" }}
      >
        <AnimatedLink>
          <NavLink to='/'>Home</NavLink>
        </AnimatedLink>
        <AnimatedLink>
          <NavLink to='/rules'>Rules</NavLink>
        </AnimatedLink>
        <AnimatedLink>
          <NavLink to='/leaderboard'>LeaderBoard</NavLink>
        </AnimatedLink>
      </Flex>
      <BurgerMenu />
    </Flex> */
