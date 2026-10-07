import Swal from "sweetalert2";

export const showSuccess = (
  title: string,
  message?: string,
): void => {
  void Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

export const showError = (
  title: string,
  message?: string,
): void => {
  void Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

export const showWarning = (
  title: string,
  message?: string,
): void => {
  void Swal.fire({
    icon: "warning",
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

export const showInfo = (
  title: string,
  message?: string,
): void => {
  void Swal.fire({
    icon: "info",
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

export const showLoading = (
  title: string = "Please wait...",
): void => {
  void Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeAlert = (): void => {
  Swal.close();
};

export const showConfirm = async (
  title: string,
  message: string,
): Promise<boolean> => {
  const result = await Swal.fire({
    icon: "warning",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  return result.isConfirmed;
};