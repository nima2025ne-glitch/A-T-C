async function standard(event) {
  event.preventDefault();

  let mail = document.getElementById("email").value;
  let user = document.getElementById("Username").value;
  let pass = document.getElementById("pass").value;
  let cpas = document.getElementById("c-pass").value;

  // فرض می‌کنیم همه چیز درسته تا خلافش ثابت بشه
  let isValid = true;

  // --- Username ---
  if (user === "" || user.length < 3 || user.length > 20) {
    document.getElementById("usernamealert").innerHTML = "نام کاربری باید بین 3 تا 20 کرکتر باشد";
    document.getElementById("usernamealert").style.color = "red";
    isValid = false;
  } else {
    document.getElementById("usernamealert").innerHTML = "";
  }

  // --- Email ---
  if (mail === "") {
    document.getElementById("emailalert").innerHTML = "ایمیل نمی‌تواند خالی باشد";
    document.getElementById("emailalert").style.color = "red";
    isValid = false;
  } else if (mail.indexOf("@") === -1) {
    document.getElementById("emailalert").innerHTML = "ایمیل باید شامل @ باشد";
    document.getElementById("emailalert").style.color = "red";
    isValid = false;
  } else if (mail.indexOf(".") === -1) {
    document.getElementById("emailalert").innerHTML = "ایمیل باید شامل نقطه (.) باشد";
    document.getElementById("emailalert").style.color = "red";
    isValid = false;
  } else {
    document.getElementById("emailalert").innerHTML = "";
  }

  // --- Password ---
  if (pass === "" || pass.length < 8 || pass.length > 20) {
    document.getElementById("passalert").innerHTML = "رمز عبور باید بین 8 تا 20 کاراکتر باشد";
    document.getElementById("passalert").style.color = "red";
    isValid = false;
  } else if (!/[_=+*&%$#@!]/.test(pass)) {
    document.getElementById("passalert").innerHTML = "رمز عبور باید شامل یکی از نمادهای خاص باشد";
    document.getElementById("passalert").style.color = "red";
    isValid = false;
  } else {
    document.getElementById("passalert").innerHTML = "";
  }

  // --- Confirm password ---
  if (cpas === "" || cpas !== pass) {
    document.getElementById("cpassalert").innerHTML = "تایید رمز عبور با رمز اصلی یکسان نیست";
    document.getElementById("cpassalert").style.color = "red";
    isValid = false;
  } else {
    document.getElementById("cpassalert").innerHTML = "";
  }

  // --- اگر همه‌چیز اوکی بود، درخواست POST بفرست ---
  if (isValid) {
    const data = {
      username: user,
      email: mail,
      password: pass
    };

    try {
      const res = await fetch("http://localhost:8000/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        alert("ثبت‌نام با موفقیت انجام شد ✅");
        window.location.replace("http://localhost:5173/", '_blank');
      } else {
        alert("خطایی رخ داده ❌");
      }
    } catch (error) {
      console.error("خطا در اتصال به سرور:", error);
      alert("سرور در دسترس نیست 😕");
    }
  } else {
    console.log("برخی فیلدها نامعتبرند، درخواست ارسال نشد.");
  }
}