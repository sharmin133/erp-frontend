import Swal from "sweetalert2";

export async function confirmDelete(
  message: string,
  title = "Are you sure?",
): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ef4444", 
    cancelButtonColor: "#047857",
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
}