/* eslint-disable react/no-unescaped-entities */
"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";

import { Div, Form, Label } from "@/styles/pages/login";

import { Link } from "@/styles/components/link";
import { Input, InputGroup } from "@/styles/components/input";
import { Spacing } from "@/styles/components/spacing";
import { Button } from "@/styles/components/button";
import { FormSection, ImageSection } from "@/styles/components/section";

export default function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const { push, replace } = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      console.error(result)
      return
    }

    replace('/dashboard')
  }

  return (
    <Div>
      <FormSection>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>
              Email:
            </Label>
            <Input
              type="email"
              // required
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <Spacing />

          <InputGroup>
            <Label>
              Password:
            </Label>
            <Input
              type="password"
              // required
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <Link href="register" onClick={() => push("register")}>I don't have an account</Link>

          <Button type="submit">
            Login
          </Button>
        </Form>
      </FormSection>
      <ImageSection>
        <Image src="undraw_login_re_4vu2.svg" alt="An SVG of an eye" width={650} height={650} />
      </ImageSection>
    </Div>
  );
}
