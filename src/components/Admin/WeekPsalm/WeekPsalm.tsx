"use client";

import TinyEditor from "@/components/TinyEditor/TinyEditor";
import AdminSection from "../Section/AdminSection";
import { useEffect, useState } from "react";
import { getData } from "@/utils/fetching";
import useActive from "@/hooks/useActive";

export default function WeekPsalm() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>();
  const [weekPsalm, setWeekPsalm] = useState<string>("Salmo semanal");
  const { active, handleTrue } = useActive(false);

  const handleChangeEditor = () => {
    handleTrue();
  };

  /* 
    const handleChangeEditor = (editor: string, onChange: (editor: string) => void) => {
    handleTrue();
    onChange(editor);
  };
  */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const data: any = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch("http://localhost:3000/api/week-psalms/1", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, status } = await getData({
          url: "http://localhost:3000/api/week-psalms",
        });

        setStatus(status);

        if (status === 200) {
          setWeekPsalm(data.weekPsalm.content);
        }
      } catch (error) {
        setStatus(500);
      }

      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <AdminSection title="Salmo semanal">
      {isLoading && (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!isLoading && status !== 200 && (
        <p className="text-xl text-center">No se encotro el salmo semanal</p>
      )}

      {!isLoading && status === 200 && (
        <form className="flex flex-col gap-4 px-8" onSubmit={handleSubmit}>
          <div className="shadow-md shadow-slate-900/50 rounded-md">
            <TinyEditor
              initialValue={weekPsalm}
              height={300}
              textareaName="content"
              onEditorChange={handleChangeEditor}
            />
            {/* <Controller
              name="editor"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TinyEditor
                  height={20}
                  onEditorChange={(editor) => {
                    handleChangeEditor(editor, onChange);
                  }}
                  value={value}
                />
              )}
            /> */}
          </div>
          <div className="form-control">
            <input
              type="submit"
              value="Actualizar"
              className="btn bg-logo text-white hover:bg-logo-900 outline-none"
              disabled={!active}
            />
          </div>
        </form>
      )}
    </AdminSection>
  );
}
