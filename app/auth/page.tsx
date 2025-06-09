'use client'
import { title } from "@/components/primitives";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import {  useState } from "react";
import { useCookies } from "react-cookie";
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { login } from "@/lib/authService";

interface CookieValues {
  name?: string;
}

export default function LoginPage() {
  // Chưa sử dụng state với pending
  const [cookies, setCookie,removeCookie] = useCookies<'user',CookieValues>(["user"]);
  const router = useRouter();
  const [error, setError] = useState('');
  const [dataShow, setDataShow] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const hadleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    const email = (formData.get('email') ?? '') as string;
    const password = (formData.get('password') ?? '') as string;
    setDataShow(`submit ${JSON.stringify(formData)}`);
    // Sau khi đăng ký kiểm tra dữ liệu bằng action() để chạy hàm signup gián tiếp thông 
    // qua useActionState để xem state dữ liệu
    try {
            const data = await login({employeeId:"03035", email, password }); 
            if(data){
              const token = data.token;
              localStorage.setItem('jwtToken', token);
            }
        } catch (err) {
            console.error('Login failed',err);
        }
  };

  return (
    <div>
      <h1 className={title()}>Form</h1>
      <Form
        className="w-full max-w-xs flex felx-col gap-4"
        onReset={() => setDataShow("reset")}
        onSubmit={(e) => hadleSubmit(e)}

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
          name="password"
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
        {dataShow && (<div className="text-small text-default-500">
          Action: <code>{dataShow}</code>
        </div>)}
      </Form>
    </div>
  );
}
