'use client'
import { title } from "@/components/primitives";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";

export default function LoginPage() {
  const [action, setAction] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const submit = (e:any) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    setAction(`submit ${JSON.stringify(data)}`);

  };
  return (
    <div>
      <h1 className={title()}>Form</h1>
      <Form
        className="w-full max-w-xs flex felx-col gap-4"
        onReset={() => setAction("reset")}
        onSubmit={(e) => submit(e)}

      >
        <Input
          isRequired
          label="Email"
          errorMessage="Nhập email hợp lệ"
          labelPlacement="outside"
          name="email"
          placeholder="Nhập email của bạn"
          type="email"
        />
        <Input
          isRequired
          label="Mật khẩu"
          labelPlacement="outside"
          name="passWord"
          placeholder="Nhập mật khẩu"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <div className="flex gap-4">
          <Button color="primary" type="submit"> Đăng nhập</Button>
        </div>
        {action && (<div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>)}
      </Form>
    </div>
  );
}
