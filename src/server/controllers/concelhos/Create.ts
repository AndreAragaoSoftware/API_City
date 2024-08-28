import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface IConcelho {
  nome: string;
  distrito: string;
}

const bodyValidation: yup.Schema<IConcelho> = yup.object().shape({
  nome: yup.string().required().min(3),
  distrito: yup.string().required().min(3),
});

export  const create = async (req: Request<{}, {}, IConcelho>, res: Response) => {

  let validateData: IConcelho | undefined = undefined;

  try {
    validateData = await bodyValidation.validate(req.body, { abortEarly: false }); // O abortEarly retorna todos os erros
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const validationErros: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if(!error.path) return; // Se o erro for underfined não devolve nada
      validationErros[error.path] = error.message; // Devolve qual o erro e onde está
    });

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ 
        errors: {
          default: validationErros
        } 
      });
  };

  console.log(validateData);

  return res.send("Created!");
};