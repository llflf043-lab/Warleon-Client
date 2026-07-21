const ADMIN_USERS=["scotmodel","nottodaysorry22","voidmywlk"];
const root=document.documentElement;
const themes={violet:["#8b5cf6","#c084fc"],orange:["#f97316","#fdba74"],blue:["#0ea5e9","#7dd3fc"],green:["#10b981","#6ee7b7"],red:["#ef4444","#fca5a5"],pink:["#ec4899","#f9a8d4"]};
const authGate=document.getElementById("authGate"),site=document.getElementById("siteContent"),form=document.getElementById("gateForm"),msg=document.getElementById("gateMessage"),submit=document.getElementById("authSubmit"),email=document.getElementById("email"),badge=document.getElementById("userBadge");
let mode="register";
function unlock(user){authGate.classList.add("hidden");site.classList.add("unlocked");const clean=user.replace("@","").toLowerCase();badge.textContent=(ADMIN_USERS.includes(clean)?"👑 ADMIN ":"@")+clean;localStorage.setItem("warleonUser",clean)}
const savedUser=localStorage.getItem("warleonUser"); if(savedUser) unlock(savedUser);
document.querySelectorAll(".auth-tab").forEach(t=>t.onclick=()=>{document.querySelectorAll(".auth-tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");mode=t.dataset.auth;email.style.display=mode==="register"?"block":"none";submit.innerHTML=mode==="register"?"Создать аккаунт <span>→</span>":"Войти <span>→</span>"});
form.onsubmit=e=>{e.preventDefault();const user=document.getElementById("username").value.trim();if(mode==="register"){localStorage.setItem("warleonRegistered","1");unlock(user)}else{if(!localStorage.getItem("warleonRegistered")){msg.textContent="Сначала необходимо зарегистрироваться.";return}unlock(user)}};
document.getElementById("logoutButton").onclick=()=>{localStorage.removeItem("warleonUser");location.reload()};
document.getElementById("themeButton").onclick=()=>document.getElementById("themePanel").classList.toggle("open");
document.getElementById("closeThemes").onclick=()=>document.getElementById("themePanel").classList.remove("open");
document.querySelectorAll("[data-theme]").forEach(b=>b.onclick=()=>{let [a,b2]=themes[b.dataset.theme];root.style.setProperty("--accent",a);root.style.setProperty("--accent2",b2);localStorage.setItem("warleonTheme",b.dataset.theme);document.getElementById("themePanel").classList.remove("open")});
const savedTheme=localStorage.getItem("warleonTheme");if(savedTheme){root.style.setProperty("--accent",themes[savedTheme][0]);root.style.setProperty("--accent2",themes[savedTheme][1])}
const modal=document.getElementById("downloadModal");document.getElementById("downloadButton").onclick=()=>modal.classList.add("open");document.querySelectorAll("[data-close]").forEach(x=>x.onclick=()=>modal.classList.remove("open"));modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};
const sections=document.querySelectorAll("main section[id]"),links=document.querySelectorAll(".side-link");window.addEventListener("scroll",()=>{let cur="home";sections.forEach(s=>{if(scrollY>=s.offsetTop-250)cur=s.id});links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+cur))});

document.querySelectorAll(".gallery-open").forEach(btn=>btn.onclick=()=>{document.getElementById("viewerImage").src=btn.dataset.image;document.getElementById("imageViewer").classList.add("open")});document.getElementById("viewerClose").onclick=()=>document.getElementById("imageViewer").classList.remove("open");document.getElementById("imageViewer").onclick=e=>{if(e.target.id==="imageViewer")document.getElementById("imageViewer").classList.remove("open")};

(function(){
  const input=document.getElementById("backgroundUrlInput");
  const fileInput=document.getElementById("backgroundFileInput");
  const fileName=document.getElementById("backgroundFileName");
  const apply=document.getElementById("applyBackgroundUrl");
  const reset=document.getElementById("resetBackground");

  function setBg(url){
    if(!url){
      document.body.style.backgroundImage="";
      document.body.style.backgroundSize="";
      document.body.style.backgroundAttachment="";
      document.body.style.backgroundPosition="";
      return;
    }
    document.body.style.backgroundImage='linear-gradient(rgba(0,0,0,.58),rgba(0,0,0,.72)), url("'+url.replace(/"/g,'&quot;')+'")';
    document.body.style.backgroundSize="cover";
    document.body.style.backgroundAttachment="fixed";
    document.body.style.backgroundPosition="center";
  }

  const savedUrl=localStorage.getItem("warleonBackgroundUrl");
  if(savedUrl){input.value=savedUrl;setBg(savedUrl)}

  apply?.addEventListener("click",()=>{
    const url=input.value.trim();
    if(!url)return;
    localStorage.setItem("warleonBackgroundUrl",url);
    localStorage.removeItem("warleonBackgroundImage");
    setBg(url);
  });

  fileInput?.addEventListener("change",()=>{
    const file=fileInput.files?.[0];
    if(!file)return;
    if(!file.type.startsWith("image/"))return;
    const reader=new FileReader();
    reader.onload=()=>{
      const dataUrl=reader.result;
      try{
        localStorage.setItem("warleonBackgroundImage",dataUrl);
        localStorage.removeItem("warleonBackgroundUrl");
        input.value="";
        fileName.textContent=file.name;
        setBg(dataUrl);
      }catch(e){
        alert("Файл слишком большой для сохранения в браузере. Используй ссылку на изображение.");
      }
    };
    reader.readAsDataURL(file);
  });

  reset?.addEventListener("click",()=>{
    localStorage.removeItem("warleonBackgroundUrl");
    localStorage.removeItem("warleonBackgroundImage");
    input.value="";
    if(fileInput)fileInput.value="";
    if(fileName)fileName.textContent="Файл не выбран";
    setBg("");
  });

  const savedImage=localStorage.getItem("warleonBackgroundImage");
  if(savedImage){setBg(savedImage);if(fileName)fileName.textContent="Сохранённое изображение"}
})();

(function(){
  const admins=["scotmodel","nottodaysorry22","voidmywlk"];
  const clean=()=>((localStorage.getItem("warleonUser")||"guest").replace("@","").toLowerCase());
  const user=clean(), isAdmin=admins.includes(user);
  const name="@"+user;
  const ids=["profileName","profileUsername","modalUsername"];
  ids.forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=name});
  const role=isAdmin?"👑 ADMIN":"Пользователь";
  ["profileRole","modalRole","modalAccess"].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=role});
  const trigger=document.getElementById("profileTrigger"), dropdown=document.getElementById("profileDropdown");
  trigger?.addEventListener("click",e=>{e.stopPropagation();dropdown?.classList.toggle("open")});
  document.addEventListener("click",()=>dropdown?.classList.remove("open"));
  document.getElementById("openProfile")?.addEventListener("click",()=>document.getElementById("profileModal")?.classList.add("open"));
  document.getElementById("profileModalClose")?.addEventListener("click",()=>document.getElementById("profileModal")?.classList.remove("open"));
  document.getElementById("openAdminPanel")?.addEventListener("click",()=>{if(isAdmin)document.getElementById("adminPanel")?.scrollIntoView({behavior:"smooth"})});
  document.getElementById("logoutButton")?.addEventListener("click",()=>{localStorage.removeItem("warleonUser");location.reload()});
  if(!isAdmin) document.querySelectorAll(".admin-only").forEach(e=>e.style.display="none");
})();
