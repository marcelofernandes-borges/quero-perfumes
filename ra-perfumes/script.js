// ─── FIREBASE CONFIG ──────────────────────────────────────────────────────────
// firebaseConfig é carregado de ./firebase-config.js
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
    // --- SELETORES GLOBAIS ---
    const cartIcon = document.querySelector(".cart-icon"),
        cartSidebar = document.querySelector(".cart-sidebar"),
        cartOverlay = document.querySelector(".cart-overlay"),
        closeCartBtn = document.querySelector(".close-cart-btn"),
        cartBody = document.querySelector(".cart-body"),
        cartBadge = document.querySelector(".cart-badge");
    const deliveryToggleBtns = document.querySelectorAll(".delivery-btn");
    const deliveryForm = document.getElementById("delivery-form-container"),
        pickupForm = document.getElementById("pickup-form-container");
    const trocoContainer = document.getElementById("troco-container");
    const couponInput = document.getElementById("coupon-input"),
        applyCouponBtn = document.getElementById("apply-coupon-btn"),
        couponFeedback = document.getElementById("coupon-feedback");
    const subtotalElem = document.getElementById("cart-subtotal"),
        cartDiscountElem = document.getElementById("cart-discount"),
        discountLineElem = document.querySelector(".discount-line"),
        totalElem = document.getElementById("cart-total");
    const finishOrderBtn = document.getElementById("finish-order-btn");
    const clearCartBtn = document.getElementById("clear-cart-btn");

    // Seletores da barra inferior
    const viewCartBanner = document.querySelector(".view-cart-banner");
    const bannerTotalElem = document.getElementById("banner-total");
    const viewCartBannerBtn = document.querySelector(".view-cart-banner-btn");

    // Seletores para o sistema de filtro
    const categoriesBar = document.getElementById("categories-bar");
    const searchInput = document.querySelector(".search-input");

    // --- PRODUTOS FIXOS ---
    let produtos = [
        {
            id: 1,
            nome: "Asad Lattafa Black 100ml",
            descricao: "Perfume árabe masculino oriental e amadeirado, com notas de pimenta preta, abacaxi, café e baunilha. Fragrância marcante, elegante e inspirada no Dior Sauvage Elixir, com alta fixação e projeção.",
            preco: 599.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQGDIBS9yznv4YU4tWj3yK0sFQPs-VAthVk7102IiyEzWtdn-UzFkyoXs3ytm1OHZMPy93wycLGlmbdMGY4wqPK5NQN_c7LlYVR98la67Qtl-L5qoaA6WQ7pJr5HjOeiILkvHU6490-dDU&usqp=CAc.jpg"
        },
        {
            id: 2,
            nome: "Perfume Asad Bourbon Lattafa 100ml",
            descricao: "Perfume árabe masculino oriental especiado, com notas marcantes de baunilha bourbon, cacau e âmbar. Fragrância elegante, quente e de altíssima fixação.",
            preco: 549.90,
            categoria: "lancamentos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRg8dvpmqIMl23StQszi0k0EYsKf1dJIlR3UUUjP23Q&s=10.jpg"
        },
        {
            id: 3,
            nome: "Perfume Veneno French Avenue 100ml",
            descricao: "Perfume árabe unissex intenso e envolvente. Combina notas doces orientais com um toque amadeirado sedutor, criando uma fragrância misteriosa, marcante e de altíssima fixação.",
            preco: 179.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCQLWWz_ylrtlERR9VaBcucWZkApixUPrloBbdF8Z25g&s=10.jpg"
        },
        {
            id: 4,
            nome: "Perfume Veneno Bianco French Avenue 100ml",
            descricao: "Perfume árabe sofisticado e afrodisíaco. Traz um toque floral e cremoso refinado para atrair olhares e elogios com elegância, sensualidade e presença marcante.",
            preco: 399.90,
            categoria: "exclusivos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1OdCaK3oo1Rtpt5_84RAZqLNd-sJPQg7TVkc4qSAbQ&s=10.jpg"
        },
        {
            id: 5,
            nome: "Perfume Veneno Scarlet French Avenue 100ml",
            descricao: "Perfume árabe de perfil frutado e extremamente sedutor. Uma fragrância quente, vibrante e provocante com excelente projeção para quem quer impressionar.",
            preco: 289.90,
            categoria: "exclusivos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-BxNdPGR_9CHx_4UTAVgFkom1Acs8iAiR8ye7WWlAMA&s=10.jpg"
        },
        {
            id: 6,
            nome: "Perfume Coco Mademoiselle Chanel 100ml",
            descricao: "Ícone de elegância e sofisticação, traz um floral oriental vibrante com notas de laranja, rosa, jasmim e patchouli. Uma fragrância marcante, refinada e inesquecível para todas as ocasiões.",
            preco: 349.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTuRb2RTOY4Hx8SDtDvlFRTGtct_2KJ6xqPOwZ0xGX7IbwetbxkIwMppPI6K8qfdtcXPGiu_T8ALb5Ho-BLKNXGQnp5H6MMbR_7lJLuGrnBcZVyJhxmNOWkZ82DFqFe3bxUn0TZNcUyN5I&usqp=CAc.jpg"
        },
        {
            id: 7,
            nome: "Perfume Yara Lattafa Eau de Parfum 100ml",
            descricao: "Perfume árabe feminino viral, conhecido pela sua fragrância doce, suave e cremosa. Combina notas de orquídea, heliotrópio e tangerina com um fundo aveludado de baunilha, morango e almíscar. Delicado, envolvente e extremamente marcante.",
            preco: 529.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRJGqEj1VZmagA2-qSP82AMyyGmTYdgT6qwD92OnWijVokyuZIksMyl3sUhnTQEpr0hpElAYG67kWPmn047npSJkvxmZZ9SF3bpORxcpWBnJvKb62nONclAHhD_9O7OlEX7sJvdFMFq8A&usqp=CAc.jpg"
        },
        {
            id: 8,
            nome: "Perfume Fakhar Rose Lattafa Eau de Parfum 100ml",
            descricao: "O famoso 'Perfume da Sereia'. Floral oriental feminino luxuoso com tuberosa, jasmim, frutas vermelhas e baunilha. Marcante e de altíssima fixação.",
            preco: 229.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT1MLInOu-ppmPgiC4LvZ3JHw4HUjkqx-Vjoi09jBCriYH7TiGL9ECTZNdcKXVh31OO7hD7xtXY1e9UuSGVcOxCdRnenfp7sTRanK9ecuq61g9M_mK7Xi-6l_UV07CxOMBwzvCrrxfste8&usqp=CAc.jpg"
        },
        {
            id: 9,
            nome: "Perfume Fakhar Black Lattafa Eau de Parfum 100ml",
            descricao: "Perfume árabe masculino elegante com notas de maçã, gengibre, sálvia e fava tonka. Inspirado no YSL Y, com presença marcante e alta fixação.",
            preco: 229.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSTkMVzdz5jGIzYHNuX9-YO9Sg7RZJBLlshHrASM0mHUYZCi8ZeQOT5t6jtz7l5f7a-_Wfpqam9DBBR5ZB5W8h5Z8NFUUFkKjVZ1JG60Hwdp74ZZiGYbWffSl3Bi8YiTD260GFhAucRGA&usqp=CAc.jpg"
        },
        {
            id: 10,
            nome: "Perfume Fakhar Gold Extrait Lattafa 100ml",
            descricao: "Perfume árabe oriental luxuoso com tuberosa, especiarias, âmbar e baunilha. Fragrância quente, intensa e de altíssima fixação.",
            preco: 249.90,
            categoria: "exclusivos",
            imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSQW16cGIuNgaBkiB6488ae8qvZ-ntHovFbqPw0cWg7LmwVc2Zw23dx_b4YUXxr7f6OkChPU_i8xlHhW24Z1TjGPK32prSabFZJMxOP-Ap1KBPIFmSCD0-XKQfaIrpgcXu65sESLEo&usqp=CAc.jpg"
        },
        {
            id: 11,
            nome: "Perfume Club de Nuit Intense Man Armaf 105ml",
            descricao: "O perfume árabe masculino mais famoso do mundo. Amadeirado especiado marcante com notas de limão, bétula e almíscar. Alta projeção e fixação.",
            preco: 299.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPT3MTBdrtDKdpchylB9wPrJctH1moyPpfxQ4_bqryuA&s=10.jpg"
        },
        {
            id: 12,
            nome: "Perfume Club de Nuit Woman Armaf 105ml",
            descricao: "Floral frutado sofisticado e envolvente com notas de pêssego, rosa, jasmim e baunilha. Elegante, marcante e luxuoso.",
            preco: 289.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmuiP17_yCdb-gIqoj8r1sPd2wuKzP3-QZiPtnA0bQJQ&s=10.jpg"
        },
        {
            id: 13,
            nome: "Perfume Sabah Al Ward Al Wataniah EDP 100ml",
            descricao: "Perfume árabe feminino floral oriental sedutor, com notas de pimenta rosa, tangerina, cacau e baunilha. Fragrância envolvente, luxuosa e de alta fixação.",
            preco: 249.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI8TPxNGn-X-4ehD_bVMPkJtj9mlRRKZ5MtmewC6aAQw&s=10.jpg"
        },
        {
            id: 14,
            nome: "Perfume Musk Al Sabah Khadlaj 100ml",
            descricao: "Perfume árabe masculino oriental amadeirado com notas cítricas, especiarias quentes, âmbar e madeiras nobres. Fragrância imponente e sofisticada.",
            preco: 259.90,
            categoria: "exclusivos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fqQ1DZIt8JRFPViMFxqB85MffK4-WnUk91kJHx_0Cw&s.jpg"
        },
        {
            id: 15,
            nome: "Perfume Eclaire Lattafa Eau de Parfum 100ml",
            descricao: "Perfume árabe feminino gourmand super doce e cremoso, com notas de caramelo, baunilha, leite e mel. Inspirado no Bianco Latte, marcante e de altíssima fixação.",
            preco: 299.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTUXz8fc4OBioxUq28zMzmKO5BXYFeuI4i1EC-0RkL7neohX-AF_LykKfyB3NiH0lPesBZ5LVX1mfV8juGSRgQaKUuELAkmEt_8v30WHYOsagJBxC0G15TPz70LY3xn&usqp=CAc.jpg"
        },
        {
            id: 16,
            nome: "Perfume Dar El Ward Houbi EDP 100ml",
            descricao: "Perfume árabe masculino quente, doce e especiado, com bergamota, especiarias e fundo amadeirado. Fragrância marcante, ousada e de alta presença.",
            preco: 279.90,
            categoria: "lancamentos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vAhWZ511A-lYJlsgzmPervQU0krgBQJFhDtIhR2S6w&s.jpg"
        },
        {
            id: 17,
            nome: "Perfume Candid Maison Alhambra EDP 100ml",
            descricao: "Perfume árabe feminino sensual e envolvente, com notas de mel, gardênia, jasmim, caramelo e patchouli. Inspirado no Scandal, marcante e de alta fixação.",
            preco: 179.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvRn86UpneFjwWf7Dj0gYVD6vmNqifhcDzYUGBuElvPA&s=10.jpg"
        },
        {
            id: 18,
            nome: "Perfume Tharwah Gold Lattafa EDP 100ml",
            descricao: "Perfume árabe feminino floral oriental luxuoso com lavanda, flor de laranjeira, jasmim e baunilha. Inspirado no YSL Libre, marcante e de alta fixação.",
            preco: 329.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6fFGpmhQZK7GAqQF5vgwOjfy-8ODRG2ns53slfGTgwA&s=10.jpg"
        },
        {
            id: 19,
            nome: "Perfume Silver King Avec Creations EDP 100ml",
            descricao: "Perfume árabe masculino oriental amadeirado e especiado. Fragrância elegante, marcante e imponente, com alta fixação.",
            preco: 220.00,
            categoria: "exclusivos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxhy5VNq5HitVUHURy7H3mv5pjd-l8Il0fRsgowmQLbA&s=10.jpg"
        },
        {
            id: 20,
            nome: "Perfume Al Noble Ameer Lattafa EDP 100ml",
            descricao: "Perfume árabe unissex oriental amadeirado com pimenta rosa, noz-moscada, âmbar e patchouli. Marcante, imponente e elegante.",
            preco: 229.90,
            categoria: "exclusivos",
            imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRTzfPqdm-tcl8xqxNjZxbM_hJE_jXDaMZIz_yoA9AUm00zHubqHtnA4dg5YPDowbRh4erJJIhJIg3K8SLl8q5DCd4-3zeIHAMjYhMFyQTZRlkMRtnl-GbKiqOqhCWJbAdhAFjkhaE&usqp=CAc.jpg"
        },
        {
            id: 21,
            nome: "Perfume Al Noble Wazeer Lattafa EDP 100ml",
            descricao: "Perfume árabe unissex frutado e gourmand, com hortelã, caramelo, chocolate e baunilha. Envolvente, doce e refinado.",
            preco: 229.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTNWMgHApqNYjXQErrNIpaCKFJI29LSu3ACtl9s4o99slFStyIv7tcfhabnxWmIqAwrBMveLPKrvox7qOB--8NzcIIt48M9cSw11cU_vtSHXEB5uRrrDOaEn68P5MiqrhEosNPsRE0&usqp=CAc.jpg"
        },
        {
            id: 22,
            nome: "Perfume Al Noble Safeer Lattafa EDP 100ml",
            descricao: "Perfume árabe unissex aromático verde e amadeirado, com bergamota, ervas, incenso e patchouli. Exótico e sofisticado.",
            preco: 229.90,
            categoria: "lancamentos",
            imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQu_CA71mQoDh7GDGK44FEVYvv7_n7sgQTdP-M4BDbsXi8o2mA4nHyeWoxtcBbZWCSFyxa27Kpbg6fuLRhVsc0zoT912iFYakDGWqJBKfb_mQezwZxonVg_hMuI40ldo0cqOi3XKaQ&usqp=CAc.jpg"
        },
        {
            id: 23,
            nome: "Perfume Salvo Maison Alhambra EDP 100ml",
            descricao: "Perfume árabe masculino refrescante e amadeirado, com notas de bergamota, pimenta, lavanda e ambroxan. Inspirado no Dior Sauvage, versátil e de alta fixação.",
            preco: 199.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQxs7A86nDfyMqfDu7AqmEAam0-FO50Si8_Fwee7mh1gN_EV6PjVEfRpyAZcEwarS_GpQhSmiCIAm4VtXWaLXHq_x7FbUwlVK2skB960N0aDSkemmvShBD024Sm8xA50fG3PiLJXw&usqp=CAc.jpg"
        },
        {
            id: 24,
            nome: "Perfume Asten Savage Intense EDP 100ml",
            descricao: "Perfume árabe masculino intenso e elegante, com bergamota, especiarias quentes, ambroxan e cedro. Inspirado no Dior Sauvage, marcante e de alta fixação.",
            preco: 189.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqzmkTl_G5NPBmSuFZrbMO6tOrmGVokFxwanXp28TWw&s=10.jpg"
        },
        {
            id: 25,
            nome: "Perfume Pisa Lattafa Pride EDP 100ml",
            descricao: "Perfume árabe masculino aromático e frutado, com toranja, gengibre e ambroxan. Inspirado no Bvlgari Tygar, fresco, elegante e marcante.",
            preco: 279.90,
            categoria: "lancamentos",
            imagem: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTwW3H9Sjo6eXDhYE2HXfJexhlKe8gwhAVwp6urvhpEZ1gNyOpdqyopd4fRtrRacRFWCxcFRbtu-pT2Rto0-PuwZII9dowFlJn-hJn4iW66JCruDjoX9SDdvuaezNm9_l4W4m3Lgw&usqp=CAc.jpg"
        },
        {
            id: 26,
            nome: "Perfume Dar El Ward Rayan EDP 100ml",
            descricao: "Perfume árabe masculino oriental especiado, com notas marcantes de baunilha e canela. Fragrância envolvente, elegante e de alta presença.",
            preco: 294.00,
            categoria: "lancamentos",
            imagem: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ-x4QbcdHoxhLxd5gxbbrMGDpesIudtzlrEnBdCnJzhaltu-nXfgpMCzcUw24Li4vO9pHrW-TUps4V1pFNJASZPPjuOcMpHbHU-rrinNMFbMwdgiIchr0uf0vJx0KXUApB0XRQaw&usqp=CAc.jpg"
        },
        {
            id: 27,
            nome: "Perfume Attar Al Wesal Al Wataniah EDP 100ml",
            descricao: "Perfume árabe masculino oriental amadeirado e sedutor, com notas de pera, lavanda, canela e baunilha preta. Inspirado no Ultra Male, marcante e de alta fixação.",
            preco: 229.90,
            categoria: "mais-vendidos",
            imagem: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR9gt0_mJOqPLkw9toQZVOV7XkVC4tAUNdV9Fd64SkJYPvagITswn1Uu9VxVwMNUcCBjcomPnF-YjcWp4Uur0-EnzuHCv9tulezpWvhvsSHu2b1R0iLcGKEWlgfDJoWFhIzVoDyVesHhJs&usqp=CAc.jpg"
        }
    ];

    // --- CARREGAR CATEGORIAS DO FIREBASE ---
    let categorias = [];
    try {
        const catSnap = await db.collection("categorias").get();
        categorias = catSnap.docs.map(d => ({ ...d.data() }));
    } catch (e) {
        console.error("Erro ao carregar categorias do Firebase:", e);
    }

    const renderizarCategoriasBar = () => {
        if (!categoriesBar) return;

        const botoesExtra = categorias
            .map(
                (c) => `
                    <button class="category-btn" data-category="${(c.slug || c.id || c.nome).toLowerCase().trim()}">
                        <i class="fa-solid ${c.icone || 'fa-tag'}"></i> ${c.nome}
                    </button>
                `
            )
            .join("");

        categoriesBar.innerHTML = `
            <button class="category-btn active" data-category="all">
                <i class="fa-solid fa-border-all"></i> Todos
            </button>
            <button class="category-btn" data-category="lancamentos">
                <i class="fa-solid fa-star"></i> Lançamentos
            </button>
            <button class="category-btn" data-category="mais-vendidos">
                <i class="fa-solid fa-fire"></i> Mais Vendidos
            </button>
            <button class="category-btn" data-category="exclusivos">
                <i class="fa-solid fa-gem"></i> Exclusivos
            </button>
            ${botoesExtra}
        `;
    };
    renderizarCategoriasBar();

    // --- CARREGAR CUPONS DO FIREBASE ---
    let coupons = [];
    try {
        const cuponsSnap = await db.collection("cupons").get();
        coupons = cuponsSnap.docs.map((d) => ({ docId: d.id, ...d.data() }));
    } catch (e) {
        console.error("Erro ao carregar cupons do Firebase:", e);
    }

    // --- CONFIGURAÇÕES DA LOJA ---
    const CONFIG_PADRAO = {
        nomeLoja: "Quero Perfumes",
        whatsapp: "64996074041",
        retiradaDias: [0, 1, 2, 3, 4, 5, 6],
        retiradaHoraInicio: "08:00",
        retiradaHoraFim: "18:00",
        retiradaIntervalo: 60,
        bannerUrl: "",
        corPrimaria: "#C6426E",
        corSecundaria: "#1F2232",
        corDestaque: "#7A1E57",
    };
    let configLoja = { ...CONFIG_PADRAO };
    try {
        const configDoc = await db.collection("configuracoes").doc("geral").get();
        if (configDoc.exists) configLoja = { ...CONFIG_PADRAO, ...configDoc.data() };
    } catch (e) {
        console.error("Erro ao carregar configurações da loja:", e);
    }

    const aplicarConfiguracoesDaLoja = () => {
        configLoja.nomeLoja = "Quero Perfumes";
        document.title = configLoja.nomeLoja;

        const headerEl = document.querySelector("header");
        if (headerEl && configLoja.bannerUrl) {
            headerEl.style.backgroundImage = `url("${configLoja.bannerUrl}")`;
            headerEl.classList.add("header--banner");
        }

        const root = document.documentElement;
        if (configLoja.corPrimaria) root.style.setProperty("--primary-color", configLoja.corPrimaria);
        if (configLoja.corSecundaria) root.style.setProperty("--secondary-color", configLoja.corSecundaria);
        if (configLoja.corDestaque) root.style.setProperty("--accent-color", configLoja.corDestaque);

        const logoTitleEl = document.querySelector(".logo h1");
        if (logoTitleEl) logoTitleEl.textContent = configLoja.nomeLoja;

        const footerEl = document.querySelector("footer p");
        if (footerEl) {
            const ano = new Date().getFullYear();
            footerEl.textContent = `${ano} — ${configLoja.nomeLoja}. Todos os direitos reservados.`;
        }

        const pickupDateInput = document.getElementById("pickup-date");
        if (pickupDateInput) {
            const hoje = new Date();
            pickupDateInput.min = hoje.toISOString().split("T")[0];
        }

        const pickupTimeSelect = document.getElementById("pickup-time");
        if (pickupTimeSelect) {
            const [hIni, mIni] = configLoja.retiradaHoraInicio.split(":").map(Number);
            const [hFim, mFim] = configLoja.retiradaHoraFim.split(":").map(Number);
            const inicioMin = hIni * 60 + mIni;
            const fimMin = hFim * 60 + mFim;
            const passo = configLoja.retiradaIntervalo || 60;
            let opcoes = `<option value="" disabled selected>Selecione</option>`;
            for (let m = inicioMin; m <= fimMin; m += passo) {
                const h = String(Math.floor(m / 60)).padStart(2, "0");
                const min = String(m % 60).padStart(2, "0");
                opcoes += `<option value="${h}:${min}">${h}:${min}</option>`;
            }
            pickupTimeSelect.innerHTML = opcoes;
        }
    };
    aplicarConfiguracoesDaLoja();

    // --- ESTADO DA APLICAÇÃO ---
    let carrinho = [],
        tipoEntrega = "delivery",
        appliedCoupon = null;

    let categoriaAtiva = "all";
    let termoBusca = "";

    const formatarMoeda = (v) =>
        v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const getScrollbarWidth = () =>
        window.innerWidth - document.documentElement.clientWidth;
    const lockScroll = () => {
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        document.body.classList.add("no-scroll");
    };
    const unlockScroll = () => {
        document.body.style.paddingRight = "";
        document.body.classList.remove("no-scroll");
    };
    const abrirCarrinho = () => {
        cartSidebar.classList.add("show");
        cartOverlay.classList.add("show");
        lockScroll();
    };
    const fecharCarrinho = () => {
        cartSidebar.classList.remove("show");
        cartOverlay.classList.remove("show");
        unlockScroll();
    };

    const animacaoVoarParaCarrinho = (productCard) => {
        const productImg = productCard.querySelector(".product-img");
        if (!productImg || !cartIcon) return;
        const imgRect = productImg.getBoundingClientRect(),
            cartRect = cartIcon.getBoundingClientRect(),
            flyingImg = document.createElement("img");
        flyingImg.src = productImg.src;
        flyingImg.classList.add("product-image-fly");
        flyingImg.style.left = `${imgRect.left}px`;
        flyingImg.style.top = `${imgRect.top}px`;
        flyingImg.style.width = `${imgRect.width}px`;
        flyingImg.style.height = `${imgRect.height}px`;
        document.body.appendChild(flyingImg);
        requestAnimationFrame(() => {
            flyingImg.style.left = `${cartRect.left + cartRect.width / 2}px`;
            flyingImg.style.top = `${cartRect.top + cartRect.height / 2}px`;
            flyingImg.style.width = "0px";
            flyingImg.style.height = "0px";
            flyingImg.style.opacity = "0";
        });
        flyingImg.addEventListener("transitionend", () => flyingImg.remove());
    };

// --- RENDERIZAÇÃO DE PRODUTOS ---
    const filtrarEMostrarProdutos = () => {
        let produtosFiltrados = produtos;

        // Filtro por Categoria
        if (categoriaAtiva && categoriaAtiva !== "all" && categoriaAtiva !== "todos") {
            produtosFiltrados = produtosFiltrados.filter((produto) => {
                const catProd = (produto.categoria || "").toLowerCase().trim();
                const catAtiva = (categoriaAtiva || "").toLowerCase().trim();

                if (catAtiva === "lancamentos" || catAtiva === "lançamentos") {
                    return catProd === "lancamentos" || catProd === "lançamentos";
                }
                if (catAtiva === "mais-vendidos" || catAtiva === "mais_vendidos" || catAtiva === "mais vendidos") {
                    return catProd === "mais-vendidos" || catProd === "mais_vendidos" || catProd === "mais vendidos";
                }
                if (catAtiva.includes("exclusivo")) {
                    return catProd.includes("exclusivo");
                }

                return catProd === catAtiva;
            });
        }

        // Filtro por Busca
        if (termoBusca.trim() !== "") {
            const termo = termoBusca.toLowerCase();
            produtosFiltrados = produtosFiltrados.filter(
                (produto) =>
                    produto.nome.toLowerCase().includes(termo) ||
                    (produto.descricao || "").toLowerCase().includes(termo)
            );
        }

        const container = document.querySelector(".products-container");
        if (!container) return;

        if (produtosFiltrados.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #999;">
                    <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.2rem; font-weight: 600;">Nenhum produto encontrado</p>
                </div>
            `;
        } else {
            container.innerHTML = produtosFiltrados
                .map(
                    (p) => `
                        <div class="product-card" data-id="${p.id}">
                            <img class="product-img" src="${p.imagem}" alt="${p.nome}">
                            <div class="product-info">
                                <h3 class="product-name">${p.nome}</h3>
                                <p class="product-description">${p.descricao}</p>
                                <p class="product-price">${formatarMoeda(p.preco)}</p>
                                <button class="product-button">Comprar</button>
                            </div>
                        </div>
                    `
                )
                .join("");
        }
    };

    const adicionarAoCarrinho = (produtoId, productCard) => {
        if (productCard) animacaoVoarParaCarrinho(productCard);
        const produto = produtos.find((p) => p.id === produtoId),
            itemNoCarrinho = carrinho.find((item) => item.id === produtoId);
        if (itemNoCarrinho) itemNoCarrinho.quantidade++;
        else carrinho.push({ ...produto, quantidade: 1 });
        atualizarCarrinho();
    };

    const alterarQuantidade = (produtoId, acao) => {
        const item = carrinho.find((i) => i.id === produtoId);
        if (!item) return;
        if (acao === "aumentar") item.quantidade++;
        else if (acao === "diminuir") {
            item.quantidade--;
            if (item.quantidade <= 0)
                carrinho = carrinho.filter((i) => i.id !== produtoId);
        }
        atualizarCarrinho();
    };

    const atualizarCarrinho = () => {
        if (!cartBody) return;

        if (carrinho.length === 0) {
            cartBody.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-box-open"></i><p>Seu carrinho está vazio.</p></div>`;
        } else {
            cartBody.innerHTML = carrinho
                .map(
                    (item) =>
                        `<div class="cart-item" data-id="${item.id}"><img src="${item.imagem}" alt="${item.nome}" class="cart-item-img"><div class="cart-item-info"><h4 class="cart-item-name">${item.nome}</h4><p class="cart-item-price">${formatarMoeda(item.preco)}</p><div class="cart-item-controls"><button class="quantity-btn" data-action="diminuir">-</button><span class="quantity">${item.quantidade}</span><button class="quantity-btn" data-action="aumentar">+</button></div></div><button class="remove-item-btn">&times;</button></div>`
                )
                .join("");
        }
        const subtotal = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0
        );

        if (
            appliedCoupon &&
            appliedCoupon.valorMinimo &&
            subtotal < appliedCoupon.valorMinimo
        ) {
            appliedCoupon = null;
            if (couponFeedback) {
                couponFeedback.textContent =
                    "Cupom removido: o pedido não atinge mais o valor mínimo exigido.";
                couponFeedback.classList.remove("success");
                couponFeedback.classList.add("error");
            }
        }

        const discountAmount = calcularDesconto(subtotal);
        const total = subtotal - discountAmount;
        if (subtotalElem) subtotalElem.textContent = formatarMoeda(subtotal);
        if (discountAmount > 0) {
            if (cartDiscountElem) cartDiscountElem.textContent = `- ${formatarMoeda(discountAmount)}`;
            if (discountLineElem) discountLineElem.style.display = "flex";
        } else {
            if (discountLineElem) discountLineElem.style.display = "none";
        }
        if (totalElem) totalElem.textContent = formatarMoeda(total);
        if (cartBadge) cartBadge.textContent = carrinho.reduce(
            (acc, item) => acc + item.quantidade,
            0
        );
        if (finishOrderBtn) finishOrderBtn.disabled = carrinho.length === 0;

        if (carrinho.length > 0 && window.innerWidth <= 768) {
            if (bannerTotalElem) bannerTotalElem.textContent = formatarMoeda(total);
            if (viewCartBanner) viewCartBanner.classList.add("show");
        } else {
            if (viewCartBanner) viewCartBanner.classList.remove("show");
        }
    };

    const calcularDesconto = (subtotal) => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.tipo === "fixo")
            return Math.min(appliedCoupon.valor, subtotal);
        return subtotal * (appliedCoupon.valor / 100);
    };

    const applyCoupon = () => {
        if (!couponInput) return;
        const code = couponInput.value.trim().toUpperCase();
        const subtotal = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0
        );
        const foundCoupon = coupons.find((c) => c.codigo === code);
        if (couponFeedback) couponFeedback.classList.remove("success", "error");

        if (!foundCoupon) {
            appliedCoupon = null;
            if (couponFeedback) {
                couponFeedback.textContent = "Cupom inválido.";
                couponFeedback.classList.add("error");
            }
        } else if (foundCoupon.ativo === false) {
            appliedCoupon = null;
            if (couponFeedback) {
                couponFeedback.textContent = "Este cupom não está mais disponível.";
                couponFeedback.classList.add("error");
            }
        } else if (
            foundCoupon.validade &&
            new Date(`${foundCoupon.validade}T23:59:59`) < new Date()
        ) {
            appliedCoupon = null;
            if (couponFeedback) {
                couponFeedback.textContent = "Este cupom expirou.";
                couponFeedback.classList.add("error");
            }
        } else if (
            foundCoupon.valorMinimo &&
            subtotal < foundCoupon.valorMinimo
        ) {
            appliedCoupon = null;
            if (couponFeedback) {
                couponFeedback.textContent = `Pedido mínimo de ${formatarMoeda(
                    foundCoupon.valorMinimo
                )} para usar este cupom.`;
                couponFeedback.classList.add("error");
            }
        } else {
            appliedCoupon = foundCoupon;
            if (couponFeedback) {
                couponFeedback.textContent = "Cupom aplicado!";
                couponFeedback.classList.add("success");
            }
        }
        atualizarCarrinho();
    };

    const finalizarPedido = () => {
        let valid = true;
        let fieldsToValidate = [];

        if (tipoEntrega === "delivery") {
            fieldsToValidate = [
                "delivery-name",
                "delivery-phone",
                "delivery-cep",
                "delivery-address",
            ];
        } else {
            fieldsToValidate = ["pickup-name", "pickup-date", "pickup-time"];
        }

        if (tipoEntrega === "pickup") {
            const dataInput = document.getElementById("pickup-date");
            if (dataInput && dataInput.value) {
                const [ano, mes, dia] = dataInput.value.split("-").map(Number);
                const diaSemana = new Date(ano, mes - 1, dia).getDay();
                if (!configLoja.retiradaDias.includes(diaSemana)) {
                    dataInput.classList.add("error");
                    alert("A loja não realiza retiradas no dia selecionado. Escolha outra data.");
                    return;
                }
            }
        }

        fieldsToValidate.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            let isFieldValid = el.value.trim() !== "";

            if (id.includes("name") && isFieldValid) {
                if (
                    el.value
                        .trim()
                        .split(" ")
                        .filter((word) => word).length < 2
                ) {
                    isFieldValid = false;
                }
            }

            if (!isFieldValid) {
                el.classList.add("error");
                valid = false;
            } else {
                el.classList.remove("error");
            }
        });

        if (!valid) {
            alert(
                "Por favor, preencha todos os campos obrigatórios marcados em vermelho."
            );
            return;
        }

        const numeroWhatsApp = configLoja.whatsapp;
        const itensPedido = carrinho
            .map((item) => `  - ${item.quantidade}x ${item.nome}`)
            .join("\n");
        const subtotal = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0
        );
        const discountAmount = calcularDesconto(subtotal);
        let cupomInfo = "";
        if (appliedCoupon) {
            cupomInfo = `\n*Cupom Aplicado:* ${appliedCoupon.codigo} (${formatarMoeda(
                discountAmount
            )})`;
        }
        const total = subtotal - discountAmount;
        let mensagem = `*-- NOVO PEDIDO ${configLoja.nomeLoja} --*\n\n*Itens:*\n${itensPedido}\n\n*Subtotal:* ${formatarMoeda(subtotal)}${cupomInfo}\n*Total:* ${formatarMoeda(total)}\n\n-------------------------\n\n`;

        if (tipoEntrega === "delivery") {
            const nome = document.getElementById("delivery-name").value;
            const phone = document.getElementById("delivery-phone").value;
            const address = document.getElementById("delivery-address").value;
            const clearCartBtn = document.getElementById("clear-cart-btn");

            const paymentMethod = document.querySelector(
                'input[name="payment"]:checked'
            ).value;
            let paymentInfo = `*Forma de Pagamento:* ${paymentMethod}`;
            if (paymentMethod === "Dinheiro") {
                const troco = document.getElementById("troco-para").value;
                paymentInfo += troco
                    ? ` (Troco para R$ ${troco})`
                    : " (Não precisa de troco)";
            }
            mensagem += `*Tipo de Pedido:* Entrega\n\n*Nome:* ${nome}\n*Telefone:* ${phone}\n*Endereço:* ${address}\n\n${paymentInfo}`;
        } else {
            const nome = document.getElementById("pickup-name").value;
            const dataInput = document.getElementById("pickup-date").value;
            const hora = document.getElementById("pickup-time").value;
            const [year, month, day] = dataInput.split("-");
            const dataFormatada = `${day}/${month}/${year}`;

            mensagem += `*Tipo de Pedido:* Retirada\n\n*Nome para Retirada:* ${nome}\n*Data Agendada:* ${dataFormatada}\n*Hora Agendada:* ${hora}`;
        }

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
        carrinho = [];
        atualizarCarrinho();

    };

    // --- EVENT LISTENERS ---
    if (cartIcon) cartIcon.addEventListener("click", abrirCarrinho);
    if (closeCartBtn) closeCartBtn.addEventListener("click", fecharCarrinho);
    if (cartOverlay) cartOverlay.addEventListener("click", fecharCarrinho);
    if (applyCouponBtn) applyCouponBtn.addEventListener("click", applyCoupon);
    if (finishOrderBtn) finishOrderBtn.addEventListener("click", finalizarPedido);
    if (viewCartBannerBtn) viewCartBannerBtn.addEventListener("click", abrirCarrinho);
    // Ação do botão para esvaziar o carrinho
if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        if (carrinho.length === 0) return;

        if (confirm("Deseja realmente esvaziar o carrinho?")) {
            carrinho = [];
            appliedCoupon = null;
            atualizarCarrinho();
        }
    });
}

    if (categoriesBar) {
        categoriesBar.addEventListener("click", (e) => {
            const btn = e.target.closest(".category-btn");
            if (!btn) return;
            categoriesBar
                .querySelectorAll(".category-btn")
                .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            categoriaAtiva = btn.dataset.category;
            filtrarEMostrarProdutos();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            termoBusca = e.target.value;
            filtrarEMostrarProdutos();
        });
    }

    const productsContainer = document.querySelector(".products-container");
    if (productsContainer) {
        productsContainer.addEventListener("click", (e) => {
            if (e.target.matches(".product-button")) {
                const productCard = e.target.closest(".product-card");
                adicionarAoCarrinho(
                    Number.parseInt(productCard.dataset.id),
                    productCard
                );
            }
        });
    }

    if (cartBody) {
        cartBody.addEventListener("click", (e) => {
            const cartItem = e.target.closest(".cart-item");
            if (cartItem) {
                const produtoId = Number.parseInt(cartItem.dataset.id);
                if (e.target.matches(".quantity-btn"))
                    alterarQuantidade(produtoId, e.target.dataset.action);
                if (e.target.matches(".remove-item-btn")) {
                    carrinho = carrinho.filter((i) => i.id !== produtoId);
                    atualizarCarrinho();
                }
            }
        });
    }

    deliveryToggleBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            deliveryToggleBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            tipoEntrega = btn.dataset.option;
            if (tipoEntrega === "delivery") {
                if (deliveryForm) deliveryForm.style.display = "block";
                if (pickupForm) pickupForm.style.display = "none";
            } else {
                if (deliveryForm) deliveryForm.style.display = "none";
                if (pickupForm) pickupForm.style.display = "block";
            }
        })
    );

    document.querySelectorAll('input[name="payment"]').forEach((radio) => {
        radio.addEventListener("change", (e) => {
            if (trocoContainer) trocoContainer.style.display = e.target.value === "Dinheiro" ? "block" : "none";
            document
                .querySelectorAll(".payment-option")
                .forEach((label) => label.classList.remove("selected"));
            e.target.closest(".payment-option").classList.add("selected");
        });
    });

    document
        .querySelectorAll(
            "#delivery-form-container input[required], #pickup-form-container input[required], #pickup-form-container select[required]"
        )
        .forEach((input) => {
            input.addEventListener("input", () => {
                if (input.value.trim() !== "") input.classList.remove("error");
            });
        });

    // --- INICIALIZAÇÃO ---
    filtrarEMostrarProdutos();
    atualizarCarrinho();
});
