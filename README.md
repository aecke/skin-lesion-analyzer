# DermaGuide - KI-gestützte Hautanalyse App

Ein interaktiver High-Fidelity Prototyp zur Demonstration von Human-AI Interaction Guidelines in medizinischen Anwendungen.

---

## 📋 Über das Projekt

DermaGuide ist ein Prototyp einer KI-gestützten Hautanalyse-App, entwickelt im Rahmen einer wissenschaftlichen Arbeit zur menschenorientierten KI-Gestaltung. Der Prototyp implementiert die 18 Human-AI Interaction Guidelines von Microsoft (Amershi et al., 2019) sowie Design Patterns aus dem Google People+AI Guidebook.

> [!WARNING]
> **Wichtiger Hinweis:** Dies ist ein Demonstrationsprototyp für Bildungszwecke und **kein medizinisches Produkt**. Er dient zur Illustration von Design-Prinzipien und sollte nicht für echte medizinische Einschätzungen verwendet werden.

---

## 🚀 Features

-   **Transparentes Onboarding:** Klare Kommunikation der Systemfähigkeiten und -grenzen.
-   **KI-Analyse-Simulation:** Risikoeinschätzung von Hautläsionen mit Konfidenzwerten.
-   **Explainable AI:** ABCD-Analyse und Grad-CAM Heatmap-Visualisierung.
-   **Timeline-Feature:** Verfolgung von Hautveränderungen über Zeit.
-   **Privacy-by-Design:** Lokale Datenverarbeitung ohne Cloud-Upload.
-   **Umfassende Nutzerkontrolle:** Granulare Einstellungen und Feedback-Mechanismen.
-   **PDF-Export:** Arztkompatible Dokumentation der Analyseergebnisse.

---

## 🛠 Technologie-Stack

-   **Frontend:** React 18 + Vite
-   **Styling:** Styled Components
-   **KI-Integration:** TensorFlow.js (Modell-Simulation)
-   **UI-Design:** Apple Human Interface Guidelines inspiriert

---

## 📦 Installation

1.  **Repository klonen:**
    ```bash
    git clone [https://github.com/aecke/skin-lesion-analyzer.git](https://github.com/aecke/skin-lesion-analyzer.git)
    cd dermaguide-prototype
    ```

2.  **Dependencies installieren:**
    ```bash
    npm install
    ```

3.  **Entwicklungsserver starten:**
    ```bash
    npm run dev
    ```

4.  **Browser öffnen unter `http://localhost:5173`**

---

## 🎯 Verwendung

1.  **Erstnutzung:** Durchlaufen Sie das Onboarding, um die Systemfähigkeiten kennenzulernen.
2.  **Neue Analyse:** Klicken Sie auf den blauen Plus-Button.
3.  **Bild aufnehmen:** Laden Sie ein Testbild hoch (die Kamera-Simulation akzeptiert alle Bildformate).
4.  **Ergebnisse verstehen:** Erkunden Sie die Risikoeinschätzung und die Erklärungen.
5.  **Historie:** Verfolgen Sie Ihre Scans in der Timeline.

---

## 📱 Implementierte Human-AI Guidelines

Der Prototyp demonstriert alle 18 Microsoft Guidelines:

-   **Initially**
    -   **G1:** Klare Systemfähigkeiten im Onboarding.
    -   **G2:** Transparente Genauigkeitsangabe (92% mit 8% Fehlerrate).
-   **During Interaction**
    -   **G3-G6:** Kontextuelle Informationen, soziale Normen, Bias-Mitigation.
-   **When Wrong**
    -   **G7-G11:** Effiziente Korrektur, Erklärbarkeit, Scope-Begrenzung.
-   **Over Time**
    -   **G12-G18:** Interaktionsgedächtnis, vorsichtige Updates, globale Kontrollen.

---

