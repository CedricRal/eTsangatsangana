--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Commandes; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Commandes" (
    id text NOT NULL,
    qt integer NOT NULL,
    lieu_livraison text,
    temps_prepa time without time zone,
    choix_place text,
    livraison text NOT NULL,
    date date NOT NULL,
    type_payement text NOT NULL,
    status text NOT NULL,
    id_users text NOT NULL,
    id_etp text NOT NULL,
    id_produits text NOT NULL
);


ALTER TABLE public."Commandes" OWNER TO etsangatsangana;

--
-- Name: Entreprises; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Entreprises" (
    id text NOT NULL,
    logo text NOT NULL,
    nom text NOT NULL,
    adresse text NOT NULL,
    tel text NOT NULL,
    adr_fb text,
    type_service text NOT NULL,
    "NIFSTAT" text,
    slogan text NOT NULL,
    description text NOT NULL,
    date_abonnement date NOT NULL,
    type_abonnement text NOT NULL,
    mode_payement text NOT NULL,
    date_payement date NOT NULL,
    id_users text NOT NULL
);


ALTER TABLE public."Entreprises" OWNER TO etsangatsangana;

--
-- Name: Factures; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Factures" (
    id text NOT NULL,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    montant integer NOT NULL,
    statut text NOT NULL,
    id_etp text NOT NULL
);


ALTER TABLE public."Factures" OWNER TO etsangatsangana;

--
-- Name: Image_produits; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Image_produits" (
    id text NOT NULL,
    titre text NOT NULL,
    id_produits text NOT NULL
);


ALTER TABLE public."Image_produits" OWNER TO etsangatsangana;

--
-- Name: Produits; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Produits" (
    id text NOT NULL,
    titre text NOT NULL,
    resume text NOT NULL,
    qt integer NOT NULL,
    prix integer NOT NULL,
    livraison text,
    place_dispo integer,
    id_etp text NOT NULL
);


ALTER TABLE public."Produits" OWNER TO etsangatsangana;

--
-- Name: Publicités; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Publicités" (
    id text NOT NULL,
    titre text NOT NULL,
    resume text NOT NULL,
    description text NOT NULL,
    prix integer NOT NULL,
    date_debut date,
    date_fin date,
    lieu text NOT NULL,
    id_produits text NOT NULL,
    id_etp text NOT NULL
);


ALTER TABLE public."Publicités" OWNER TO etsangatsangana;

--
-- Name: Rôles; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Rôles" (
    id text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public."Rôles" OWNER TO etsangatsangana;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Users" (
    id text NOT NULL,
    nom text NOT NULL,
    prenom text NOT NULL,
    num_tel text NOT NULL,
    mail text NOT NULL,
    adresse text NOT NULL,
    photo text NOT NULL,
    mdp text NOT NULL,
    adr_fb text,
    adr_gmail text,
    id_apple text
);


ALTER TABLE public."Users" OWNER TO etsangatsangana;

--
-- Name: Users_Roles; Type: TABLE; Schema: public; Owner: etsangatsangana
--

CREATE TABLE public."Users_Roles" (
    id text NOT NULL,
    id_user text NOT NULL,
    id_role text NOT NULL
);


ALTER TABLE public."Users_Roles" OWNER TO etsangatsangana;

--
-- Data for Name: Commandes; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Commandes" (id, qt, lieu_livraison, temps_prepa, choix_place, livraison, date, type_payement, status, id_users, id_etp, id_produits) FROM stdin;
df183167-2d3b-4f2e-814a-7e89167e394f	2	\N	\N	\N		2023-02-03	Paiement à la livraison	Payé	d227998d-554d-4292-964e-bd7dd93dfc4e	bce8a6cb-62b1-4e09-9123-d3d2b2ff5370	79388ba0-bf30-40fc-ba45-ba6aef73f7c2
\.


--
-- Data for Name: Entreprises; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Entreprises" (id, logo, nom, adresse, tel, adr_fb, type_service, "NIFSTAT", slogan, description, date_abonnement, type_abonnement, mode_payement, date_payement, id_users) FROM stdin;
bce8a6cb-62b1-4e09-9123-d3d2b2ff5370	./image/jyf.jpg	Mercury	II j cdgd Anosy	0314649461	Mercury Fb	Hotellerie	NIF_STAT	Lorem ipsum	Lorem ipsum sit amet dolore	2023-12-02	Premium	Paiement par carte	2023-11-02	d227998d-554d-4292-964e-bd7dd93dfc4e
52839a19-fe46-4cc9-b7d1-82551bf8b48e	./image/chickyLogo.jpg	Chicky	II j cdgd Behoririka	0314466622	Chicky Fb	Restauration	NIF_STAT	Lorem ipsum	Lorem ipsum sit amet dolore	2023-12-02	Premium	Paiement par carte	2023-11-02	d227998d-554d-4292-964e-bd7dd93dfc4e
03bbe27a-09a7-4d62-a254-c6bdfaf0649c	./image/sonatraLogo.jpg	Sonatra	II j cdgd Ampasampito	0315566677	Sonatra Fb	Transport	NIF_STAT	Lorem ipsum	Lorem ipsum sit amet dolore	2023-12-02	Premium	Paiement par carte	2023-11-02	d227998d-554d-4292-964e-bd7dd93dfc4e
\.


--
-- Data for Name: Factures; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Factures" (id, date_debut, date_fin, montant, statut, id_etp) FROM stdin;
\.


--
-- Data for Name: Image_produits; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Image_produits" (id, titre, id_produits) FROM stdin;
db7fc0c5-5d45-4df4-be3d-46d6d89a591b	http://res.cloudinary.com/dbcebkda2/image/upload/v1677500328/db7fc0c5-5d45-4df4-be3d-46d6d89a591b.png	e89b6e3d-ddf9-4110-9c75-4baa0edc3b45
b2a580de-88f3-44a7-9750-6384f6d7714f	http://res.cloudinary.com/dbcebkda2/image/upload/v1677500483/b2a580de-88f3-44a7-9750-6384f6d7714f.png	14746101-1cbe-4322-96be-0ceba621da56
d4a080e8-3674-4f0e-adea-95fc5349fdf2	http://res.cloudinary.com/dbcebkda2/image/upload/v1677500673/d4a080e8-3674-4f0e-adea-95fc5349fdf2.png	79388ba0-bf30-40fc-ba45-ba6aef73f7c2
1f17e555-6971-49ae-be94-128095463273	http://res.cloudinary.com/dbcebkda2/image/upload/v1677500788/1f17e555-6971-49ae-be94-128095463273.jpg	ccd30261-f707-4270-8cee-41c9db31185f
6ce9f880-502b-4e97-b476-fd049fb89b6b	http://res.cloudinary.com/dbcebkda2/image/upload/v1677500884/6ce9f880-502b-4e97-b476-fd049fb89b6b.png	f43d9706-724e-48e8-bf2f-42b867e0b843
3f973731-9aca-4707-ac59-7211b4ff436e	http://res.cloudinary.com/dbcebkda2/image/upload/v1677501054/3f973731-9aca-4707-ac59-7211b4ff436e.jpg	adff0688-45b1-4984-a63e-387cf671eb4c
\.


--
-- Data for Name: Produits; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Produits" (id, titre, resume, qt, prix, livraison, place_dispo, id_etp) FROM stdin;
e89b6e3d-ddf9-4110-9c75-4baa0edc3b45	Nuggets	Résumé du produit	12	24000	Avec	\N	52839a19-fe46-4cc9-b7d1-82551bf8b48e
14746101-1cbe-4322-96be-0ceba621da56	Pizza	Résumé du produit	12	28000	Avec	\N	52839a19-fe46-4cc9-b7d1-82551bf8b48e
79388ba0-bf30-40fc-ba45-ba6aef73f7c2	Chambre d'hôtel	Résumé du produit	4	200000	Sans	\N	bce8a6cb-62b1-4e09-9123-d3d2b2ff5370
ccd30261-f707-4270-8cee-41c9db31185f	Hôtel	Résumé du produit	2	200000	Sans	\N	bce8a6cb-62b1-4e09-9123-d3d2b2ff5370
f43d9706-724e-48e8-bf2f-42b867e0b843	Tana Antsirabe	Résumé du produit	24	12000	Sans	24	03bbe27a-09a7-4d62-a254-c6bdfaf0649c
adff0688-45b1-4984-a63e-387cf671eb4c	Tana Tamatave	Résumé du produit	24	40000	Sans	24	03bbe27a-09a7-4d62-a254-c6bdfaf0649c
\.


--
-- Data for Name: Publicités; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Publicités" (id, titre, resume, description, prix, date_debut, date_fin, lieu, id_produits, id_etp) FROM stdin;
fa4ad9ab-1359-491e-818d-6df21aeeb911	Nuggets	Restaurant	Lorem ipsum, sit amet	21000	2023-01-14	2023-02-24	Behoririka	e89b6e3d-ddf9-4110-9c75-4baa0edc3b45	52839a19-fe46-4cc9-b7d1-82551bf8b48e
8a587d83-05be-44a0-94f4-8b9ce2731d60	Pizza	Restaurant	Lorem ipsum, sit amet	21000	2023-01-14	2023-02-24	Behoririka	14746101-1cbe-4322-96be-0ceba621da56	52839a19-fe46-4cc9-b7d1-82551bf8b48e
c9b43375-aa2e-4ceb-a273-89e1f34f58ca	Chambre comfort	Hotel	Lorem ipsum, sit amet	150000	2023-01-17	2023-02-21	Anosy	79388ba0-bf30-40fc-ba45-ba6aef73f7c2	bce8a6cb-62b1-4e09-9123-d3d2b2ff5370
45da39ab-04a9-422e-8c79-0cb25c829dac	Chambre économique	Hotel	Lorem ipsum, sit amet	120000	2023-02-17	2023-02-28	Anosy	ccd30261-f707-4270-8cee-41c9db31185f	bce8a6cb-62b1-4e09-9123-d3d2b2ff5370
4ddb4080-3341-4cd8-9af1-03f8b3d098a0	Tana Antsirabe	Transport	Lorem ipsum, sit amet	10000	2023-01-05	2023-02-13	Ambodivona	f43d9706-724e-48e8-bf2f-42b867e0b843	03bbe27a-09a7-4d62-a254-c6bdfaf0649c
fb9beb50-befe-4aae-bc24-0fdd298601f1	Tana Tamatave	Transport	Lorem ipsum, sit amet	35000	2023-01-05	2023-02-13	Ampasampito	adff0688-45b1-4984-a63e-387cf671eb4c	03bbe27a-09a7-4d62-a254-c6bdfaf0649c
\.


--
-- Data for Name: Rôles; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Rôles" (id, description) FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Users" (id, nom, prenom, num_tel, mail, adresse, photo, mdp, adr_fb, adr_gmail, id_apple) FROM stdin;
d227998d-554d-4292-964e-bd7dd93dfc4e	vina	master	0334344455	vina@gmail.com	soav	source/img	$2a$10$VRd0sv6ZXgauboPoKioFa.ro0Xqkx6K2XyqgOJk3GeCxxKcE45zUe	vina	vina@gmail.com	f1
eaf0809d-8644-4d02-9684-50953cf27da9	vina	master	0334344455	vina@gmail.com	soav	source/img	$2a$10$KBqok9xFR.yHR10wmB.HBOVu76G6m1j6XVASiqJFuip1/XU/ZqQIO	vina	vina@gmail.com	f1
885ee7c5-7316-4200-bc1e-b2812ad40120	Ral	Ced	0350012300	ced@gmail.com	Tana	source/photo/img	$2a$10$8X1Jw1T88kKlWiiUrm9.3OWmqHIYlzroDZUx11KjfpahEeNL623O6	\N	\N	\N
c0d75a54-e96d-4854-92be-851c528effc8	Rakoto	Hafa	9595465965	Rakoto@yahoo.fr	Soavimbaoka 	source/photo/img	$2a$10$BejbM0UctBYwTc1VTAD9cuUAGeSrSspgOoCXUGr.Ps6wmRA3o9HmW	\N	\N	\N
dbc5cdbf-7ebc-4e49-97bf-b27ea618337d	Rakoto	Hafa	0330033311	rakoto@yahoo.fr	Soavimbaoka 	source/photo/img	$2a$10$AP/DDPnpeURHXB2yaz1gWukTbYLddHvDQSucttoidijZuLoKXjJCu	\N	\N	\N
\.


--
-- Data for Name: Users_Roles; Type: TABLE DATA; Schema: public; Owner: etsangatsangana
--

COPY public."Users_Roles" (id, id_user, id_role) FROM stdin;
\.


--
-- Name: Commandes Commandes_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Commandes"
    ADD CONSTRAINT "Commandes_pkey" PRIMARY KEY (id);


--
-- Name: Entreprises Entreprises_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Entreprises"
    ADD CONSTRAINT "Entreprises_pkey" PRIMARY KEY (id);


--
-- Name: Factures Factures_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Factures"
    ADD CONSTRAINT "Factures_pkey" PRIMARY KEY (id);


--
-- Name: Image_produits Image_produits_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Image_produits"
    ADD CONSTRAINT "Image_produits_pkey" PRIMARY KEY (id);


--
-- Name: Produits Produits_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Produits"
    ADD CONSTRAINT "Produits_pkey" PRIMARY KEY (id);


--
-- Name: Publicités Publicités_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Publicités"
    ADD CONSTRAINT "Publicités_pkey" PRIMARY KEY (id);


--
-- Name: Rôles Rôles_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Rôles"
    ADD CONSTRAINT "Rôles_pkey" PRIMARY KEY (id);


--
-- Name: Users_Roles Users_Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Users_Roles"
    ADD CONSTRAINT "Users_Roles_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Commandes commandes_id_etp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Commandes"
    ADD CONSTRAINT commandes_id_etp_fkey FOREIGN KEY (id_etp) REFERENCES public."Entreprises"(id) ON DELETE CASCADE;


--
-- Name: Commandes commandes_id_produits_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Commandes"
    ADD CONSTRAINT commandes_id_produits_fkey FOREIGN KEY (id_produits) REFERENCES public."Produits"(id) ON DELETE CASCADE;


--
-- Name: Commandes commandes_id_users_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Commandes"
    ADD CONSTRAINT commandes_id_users_fkey FOREIGN KEY (id_users) REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Entreprises entreprises_id_users_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Entreprises"
    ADD CONSTRAINT entreprises_id_users_fkey FOREIGN KEY (id_users) REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Factures factures_id_etp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Factures"
    ADD CONSTRAINT factures_id_etp_fkey FOREIGN KEY (id_etp) REFERENCES public."Entreprises"(id) ON DELETE CASCADE;


--
-- Name: Image_produits image_produits_id_produits_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Image_produits"
    ADD CONSTRAINT image_produits_id_produits_fkey FOREIGN KEY (id_produits) REFERENCES public."Produits"(id) ON DELETE CASCADE;


--
-- Name: Produits produits_id_etp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Produits"
    ADD CONSTRAINT produits_id_etp_fkey FOREIGN KEY (id_etp) REFERENCES public."Entreprises"(id) ON DELETE CASCADE;


--
-- Name: Publicités publicités_id_etp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Publicités"
    ADD CONSTRAINT "publicités_id_etp_fkey" FOREIGN KEY (id_etp) REFERENCES public."Entreprises"(id) ON DELETE CASCADE;


--
-- Name: Publicités publicités_id_produits_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Publicités"
    ADD CONSTRAINT "publicités_id_produits_fkey" FOREIGN KEY (id_produits) REFERENCES public."Produits"(id) ON DELETE CASCADE;


--
-- Name: Users_Roles users_roles_id_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Users_Roles"
    ADD CONSTRAINT users_roles_id_role_fkey FOREIGN KEY (id_role) REFERENCES public."Rôles"(id);


--
-- Name: Users_Roles users_roles_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: etsangatsangana
--

ALTER TABLE ONLY public."Users_Roles"
    ADD CONSTRAINT users_roles_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

