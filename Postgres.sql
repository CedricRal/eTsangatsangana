CREATE TABLE IF NOT EXISTS "Users" (
    id text NOT NULL PRIMARY KEY,
    nom text NOT NULL,
    prenom text NOT NULL,
    num_tel text NOT NULL,
    mail text NOT NULL,
    adresse text NOT NULL,
    photo text NOT NULL,
    mdp text NOT NULL,
    adr_fb text,
    adr_gmail text,
    id_apple text,
    CONSTRAINT "Users_id_etp_fkey" FOREIGN KEY ("id_etp") REFERENCES "Entreprises"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Rôles" (
    id text NOT NULL PRIMARY KEY,
    description text NOT NULL
);

CREATE TABLE IF NOT EXISTS "Users_Roles" (
    id text NOT NULL PRIMARY KEY,
    id_user text NOT NULL,
    id_role text NOT NULL,
    CONSTRAINT "Users_Roles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Rôles"("id") ON DELETE CASCADE,
    CONSTRAINT "Users_Roles_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Entreprises" (
    id text NOT NULL PRIMARY KEY,
    logo text NOT NULL,
    nom text NOT NULL,
    adresse text NOT NULL,
    tel text NOT NULL,
    adr_fb text,
    type_service text NOT NULL,
    "NIF/STAT" text,
    slogan text NOT NULL,
    description text NOT NULL,
    date_abonnement date NOT NULL,
    type_abonnement text NOT NULL,
    mode_payement text NOT NULL,
    date_payement date NOT NULL,
    status integer NOT NULL,
);

CREATE TABLE IF NOT EXISTS "Produits" (
    id text NOT NULL PRIMARY KEY,
    titre text NOT NULL,
    "résumé" text NOT NULL,
    qt integer NOT NULL,
    prix integer NOT NULL,
    livraison text,
    place_dispo integer,
    id_etp text NOT NULL,
    CONSTRAINT "Produits_id_etp_fkey" FOREIGN KEY ("id_etp") REFERENCES "Entreprises"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Commandes" (
    id text NOT NULL PRIMARY KEY,
    qt integer NOT NULL,
    lieu_livraison text,
    temps_prepa time without time zone,
    choix_place text,
    livraison text NOT NULL,
    date date NOT NULL,
    type_payement text NOT NULL,
    statut text NOT NULL,
    id_users text NOT NULL,
    id_etp text NOT NULL,
    id_produits text NOT NULL,
    CONSTRAINT "Commandes_id_etp_fkey" FOREIGN KEY ("id_etp") REFERENCES "Entreprises"("id") ON DELETE CASCADE,
    CONSTRAINT "Commandes_id_produits_fkey" FOREIGN KEY ("id_produits") REFERENCES "Produits"("id") ON DELETE CASCADE,
    CONSTRAINT "Commandes_id_users_fkey" FOREIGN KEY ("id_users") REFERENCES "Users"("id") ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "Factures" (
    id text NOT NULL PRIMARY KEY,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    montant integer NOT NULL,
    statut text NOT NULL,
    id_etp text NOT NULL,
    CONSTRAINT "Factures_id_etp_fkey" FOREIGN KEY ("id_etp") REFERENCES "Entreprises"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Image_produits" (
    id text NOT NULL PRIMARY KEY,
    titre text NOT NULL,
    id_produits text NOT NULL, 
    CONSTRAINT "Image_produits_id_produits_fkey" FOREIGN KEY ("id_produits") REFERENCES "Produits"("id") ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "Publicités" (
    id text NOT NULL PRIMARY KEY,
    titre text NOT NULL,
    "résumé" text NOT NULL,
    description text NOT NULL,
    prix integer NOT NULL,
    date_debut date,
    date_fin date,
    lieu text NOT NULL,
    id_produits text NOT NULL,
    id_etp text NOT NULL,
    CONSTRAINT "Publicités_id_etp_fkey" FOREIGN KEY ("id_etp") REFERENCES "Entreprises"("id") ON DELETE CASCADE,
    CONSTRAINT "Publicités_id_produits_fkey" FOREIGN KEY ("id_produits") REFERENCES "Produits"("id") ON DELETE CASCADE
);
