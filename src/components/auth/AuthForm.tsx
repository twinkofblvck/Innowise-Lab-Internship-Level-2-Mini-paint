import { Button, Heading } from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { FormInput } from "@/components/generic";
import { IAuthFormProps } from "@/components/auth";

const AuthForm: FC<IAuthFormProps> = ({ title, action, children }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);
  const onPassChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value), []);

  const authenticate = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const cleanEmail = email.trim();
      const cleanPass = pass.trim();

      action(cleanEmail, cleanPass);
    },
    [email, pass, action]
  );

  return (
    <form onSubmit={authenticate}>
      <Heading textAlign="center">{title}</Heading>
      <FormInput id="email" label="Email" key="email" value={email} onChange={onEmailChange} />
      <FormInput id="pass" label="Password" type="password" key="pass" value={pass} onChange={onPassChange} />
      <Button display="block" m="auto" type="submit">
        Submit
      </Button>
      {children}
    </form>
  );
};

export default AuthForm;
