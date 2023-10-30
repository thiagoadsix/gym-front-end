"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Div, Form, Label } from "@/styles/pages/register";

import { Link } from "@/styles/components/link";
import { Input, InputGroup } from "@/styles/components/input";
import { Spacing } from "@/styles/components/spacing";
import { Button } from "@/styles/components/button";
import { FormSection, ImageSection } from "@/styles/components/section";

export default function Register() {
  const { push } = useRouter()

  return (
    <Div>
      <FormSection>

        <Form>
          <InputGroup>
            <Label>
              Name:
            </Label>
            <Input
              type="email"
              required
            />
          </InputGroup>

          <Spacing />

          <InputGroup>
            <Label>
              Email:
            </Label>
            <Input
              type="email"
              required
            />
          </InputGroup>

          <Spacing />

          <InputGroup>
            <Label>
              Password:
            </Label>
            <Input
              type="password"
              required
            />
          </InputGroup>

          <Link href="login" onClick={() => push("login")}>I already have an account</Link>

          <Button>
            Login
          </Button>
        </Form>
      </FormSection>

      <ImageSection>
        <Image src="/undraw_sign_up_n6im.svg" alt="An SVG of an eye" width={650} height={650} />
      </ImageSection>
    </Div>
  );
}
