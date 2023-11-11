"use client"

export const FormErrorMessage = ({ message }: { message?: string }) => (
  <p className='text-sm text-red-600'>{message}</p>
);