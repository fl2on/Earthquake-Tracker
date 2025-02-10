// script.js

let map;
let magnitudeChart;
let timeSeriesChart;
let depthChart;
let markerClusterGroup;
let userLocation;
let currentEarthquakesData; // Variable global para almacenar los datos de terremotos

// Objeto con las traducciones (directamente en script.js para simplificar)
const translations = {
    es: {
        titulo_pagina: "Centro de Información Sísmica Global",
        titulo_principal: "Información Sísmica Global al Alcance de tu Mano",
        texto_principal: "Mantente actualizado con los últimos datos sísmicos y aprende cómo protegerte y proteger a tus seres queridos.",
        boton_mapa: "Ver Mapa Interactivo",
        inicio: "Inicio",
        estadisticas: "Estadísticas",
        noticias: "Noticias",
        consejos: "Consejos",
        mapa_terremotos: "Mapa de Terremotos Recientes",
        magnitud_minima: "Magnitud mínima:",
        periodo: "Periodo:",
        ultima_hora: "Última Hora",
        ultimo_dia: "Último Día",
        ultima_semana: "Última Semana",
        ultimo_mes: "Último Mes",
        estilo_mapa: "Estilo del Mapa:",
        calles: "Calles",
        satelite: "Satélite",
        terreno: "Terreno",
        estadisticas_terremotos: "Estadísticas de Terremotos",
        total: "Total",
        promedio: "Promedio",
        maximo: "Máximo",
        ultimas_24h: "Últimas 24h",
        distribucion_magnitudes: "Distribución de Magnitudes",
        numero_terremotos_label_y: "Número de Terremotos",
        magnitud_label_x_magnitude: "Magnitud",
        magnitud_tiempo: "Magnitud en el Tiempo",
        magnitud_tiempo_chart_title: "Magnitud de Terremotos a lo largo del Tiempo",
        fecha_label_x_timeseries: "Fecha",
        magnitud_label_y_timeseries: "Magnitud",
        distribucion_profundidad: "Distribución de Profundidad",
        distribucion_profundidad_chart_title: "Distribución de Terremotos por Profundidad",
        ultimos_terremotos: "Últimos Terremotos",
        noticias_sismicas: "Noticias Sísmicas",
		latest_quake_magnitude: "Magnitud",
        no_noticias: "No hay noticias recientes para mostrar.",
        consejos_seguridad: "Consejos de Seguridad",
        antes_terremoto: "Antes",
        durante_terremoto: "Durante",
        despues_terremoto: "Después",
        kit_emergencia: "Kit de Emergencia",
        recursos_educativos: "Recursos Educativos",
        texto_recursos_videos: "Aprende más sobre terremotos y cómo prepararte.",
        ver_videos: "Ver Videos",
        texto_recursos_guia: "Descarga nuestra guía completa de preparación para terremotos.",
        descargar_pdf: "Descargar PDF",
        copyright: "© %{year} Centro de Información Sísmica Global. Todos los derechos reservados.",
        alerta_titulo: "¡Alerta de Terremoto Significativo!",
        alerta_significativo: "¡Terremoto SIGNIFICATIVO de magnitud %{magnitude} detectado en %{lugar}! Consulta el mapa y mantente informado.",
        alerta_cercano: "¡Posible terremoto cerca! Se ha detectado un temblor de magnitud %{magnitude} cerca de tu ubicación.",
        popup_magnitud: "Magnitud",
        popup_ubicacion: "Ubicación",
        popup_profundidad: "Profundidad",
        popup_fecha: "Fecha",
        leer_mas: "Leer más",
        antes_terremoto_detalles: "Asegura objetos altos, prepara un kit de emergencia, y establece un plan familiar.",
        durante_terremoto_detalles: "Métete bajo una mesa robusta, aléjate de ventanas y paredes exteriores.",
        despues_terremoto_detalles: "Verifica si hay heridos, revisa las instalaciones de gas y electricidad, espera réplicas.",
        kit_emergencia_detalles: "Agua, alimentos no perecederos, radio, linterna, botiquín de primeros auxilios.",
        distribucion_magnitudes_chart_title: "Distribución de Magnitudes",
        distribucion_profundidad_chart_title: "Distribución de Profundidad"
    },
    en: {
        titulo_pagina: "Global Seismic Information Center",
        titulo_principal: "Global Earthquake Information at Your Fingertips",
        texto_principal: "Stay updated with the latest seismic data and learn how to protect yourself and your loved ones.",
        boton_mapa: "View Interactive Map",
        inicio: "Home",
        estadisticas: "Statistics",
        noticias: "News",
        consejos: "Tips",
        mapa_terremotos: "Recent Earthquakes Map",
        magnitud_minima: "Minimum Magnitude:",
        periodo: "Time Period:",
        ultima_hora: "Last Hour",
        ultimo_dia: "Last Day",
        ultima_semana: "Last Week",
        ultimo_mes: "Last Month",
        estilo_mapa: "Map Style:",
        calles: "Streets",
        satelite: "Satellite",
        terreno: "Terrain",
        estadisticas_terremotos: "Earthquake Statistics",
        total: "Total",
        promedio: "Average",
        maximo: "Maximum",
        ultimas_24h: "Last 24h",
        distribucion_magnitudes: "Magnitude Distribution",
        numero_terremotos_label_y: "Number of Earthquakes",
        magnitud_label_x_magnitude: "Magnitude",
        magnitud_tiempo: "Magnitude Over Time",
        magnitud_tiempo_chart_title: "Earthquake Magnitude Over Time",
        fecha_label_x_timeseries: "Date",
        magnitud_label_y_timeseries: "Magnitude",
        distribucion_profundidad: "Depth Distribution",
        distribucion_profundidad_chart_title: "Earthquake Distribution by Depth",
        ultimos_terremotos: "Latest Earthquakes",
        noticias_sismicas: "Seismic News",
		latest_quake_magnitude: "Magnitude",
        no_noticias: "No recent news to display.",
        consejos_seguridad: "Safety Tips",
        antes_terremoto: "Before",
        durante_terremoto: "During",
        despues_terremoto: "After",
        kit_emergencia: "Emergency Kit",
        recursos_educativos: "Educational Resources",
        texto_recursos_videos: "Learn more about earthquakes and how to prepare.",
        ver_videos: "Watch Videos",
        texto_recursos_guia: "Download our complete earthquake preparedness guide.",
        descargar_pdf: "Download PDF",
        copyright: "© %{year} Global Seismic Information Center. All rights reserved.",
        alerta_titulo: "Significant Earthquake Alert!",
        alerta_significativo: "SIGNIFICANT earthquake of magnitude %{magnitude} detected in %{lugar}! Check the map and stay informed.",
        alerta_cercano: "Possible earthquake nearby! Tremor of magnitude %{magnitude} detected near your location.",
        popup_magnitud: "Magnitude",
        popup_ubicacion: "Location",
        popup_profundidad: "Depth",
        popup_fecha: "Date",
        leer_mas: "Read more",
        antes_terremoto_detalles: "Secure tall objects, prepare an emergency kit, and establish a family plan.",
        durante_terremoto_detalles: "Get under a sturdy table, stay away from windows and exterior walls.",
        despues_terremoto_detalles: "Check for injuries, inspect gas and electricity, expect aftershocks.",
        kit_emergencia_detalles: "Water, non-perishable food, radio, flashlight, first aid kit.",
        distribucion_magnitudes_chart_title: "Magnitude Distribution",
        distribucion_profundidad_chart_title: "Depth Distribution"
    },
    fr: {
        titulo_pagina: "Centre d'Information Sismique Mondial",
        titulo_principal: "Informations Mondiales sur les Séismes à Portée de Main",
        texto_principal: "Restez informé des dernières données sismiques et apprenez à vous protéger et à protéger vos proches.",
        boton_mapa: "Voir la Carte Interactive",
        inicio: "Accueil",
        estadisticas: "Statistiques",
        noticias: "Actualités",
        consejos: "Conseils",
        mapa_terremotos: "Carte des Séismes Récents",
        magnitud_minima: "Magnitude minimale:",
        periodo: "Période:",
        ultima_hora: "Dernière Heure",
        ultimo_dia: "Dernier Jour",
        ultima_semana: "Dernière Semaine",
        ultimo_mes: "Dernier Mois",
        estilo_mapa: "Style de la Carte:",
        calles: "Rues",
        satelite: "Satellite",
        terreno: "Terrain",
        estadisticas_terremotos: "Statistiques des Séismes",
        total: "Total",
        promedio: "Moyenne",
        maximo: "Maximum",
        ultimas_24h: "Dernières 24h",
        distribucion_magnitudes: "Distribution des Magnitudes",
        numero_terremotos_label_y: "Nombre de Séismes",
        magnitud_label_x_magnitude: "Magnitude",
        magnitud_tiempo: "Magnitude au Fil du Temps",
        magnitud_tiempo_chart_title: "Magnitude des Séismes au Fil du Temps",
        fecha_label_x_timeseries: "Date",
        magnitud_label_y_timeseries: "Magnitude",
        distribucion_profundidad: "Distribution de la Profondeur",
        distribucion_profundidad_chart_title: "Distribution des Séismes par Profondeur",
        ultimos_terremotos: "Derniers Séismes",
        noticias_sismicas: "Actualités Sismiques",
		latest_quake_magnitude: "Magnitude",
        no_noticias: "Pas d'actualités récentes à afficher.",
        consejos_seguridad: "Conseils de Sécurité",
        antes_terremoto: "Avant",
        durante_terremoto: "Pendant",
        despues_terremoto: "Après",
        kit_emergencia: "Kit d'Urgence",
        recursos_educativos: "Ressources Éducatives",
        texto_recursos_videos: "Apprenez-en davantage sur les séismes et comment se préparer.",
        ver_videos: "Regarder des Vidéos",
        texto_recursos_guia: "Téléchargez notre guide complet de préparation aux séismes.",
        descargar_pdf: "Télécharger PDF",
        copyright: "© %{year} Centre d'Information Sismique Mondial. Tous droits réservés.",
        alerta_titulo: "Alerte de Séisme Important!",
        alerta_significativo: "Séisme IMPORTANT de magnitude %{magnitude} détecté à %{lugar} ! Consultez la carte et restez informé.",
        alerta_cercano: "Séisme possible à proximité ! Secousse de magnitude %{magnitude} détectée près de votre emplacement.",
        popup_magnitud: "Magnitude",
        popup_ubicacion: "Emplacement",
        popup_profundidad: "Profondeur",
        popup_fecha: "Date",
        leer_mas: "Lire la suite",
        antes_terremoto_detalles: "Sécurisez les objets hauts, préparez un kit d'urgence et établissez un plan familial.",
        durante_terremoto_detalles: "Mettez-vous sous une table robuste, éloignez-vous des fenêtres et des murs extérieurs.",
        despues_terremoto_detalles: "Vérifiez s'il y a des blessés, inspectez le gaz et l'électricité, attendez-vous à des répliques.",
        kit_emergencia_detalles: "Eau, aliments non périssables, radio, lampe de poche, trousse de premiers secours.",
        distribucion_magnitudes_chart_title: "Distribution des Magnitudes",
        distribucion_profundidad_chart_title: "Distribution de la Profondeur"
    },
    de: {
        titulo_pagina: "Globales Seismisches Informationszentrum",
        titulo_principal: "Globale Erdbebeninformationen zum Greifen nah",
        texto_principal: "Bleiben Sie auf dem Laufenden mit den neuesten seismischen Daten und lernen Sie, wie Sie sich und Ihre Lieben schützen können.",
        boton_mapa: "Interaktive Karte Anzeigen",
        inicio: "Startseite",
        estadisticas: "Statistiken",
        noticias: "Nachrichten",
        consejos: "Tipps",
        mapa_terremotos: "Karte der Letzten Erdbeben",
        magnitud_minima: "Mindestmagnitude:",
        periodo: "Zeitraum:",
        ultima_hora: "Letzte Stunde",
        ultimo_dia: "Letzter Tag",
        ultima_semana: "Letzte Woche",
        ultimo_mes: "Letzter Monat",
        estilo_mapa: "Kartenstil:",
        calles: "Straßen",
        satelite: "Satellit",
        terreno: "Gelände",
        estadisticas_terremotos: "Erdbebenstatistiken",
        total: "Gesamt",
        promedio: "Durchschnitt",
        maximo: "Maximum",
        ultimas_24h: "Letzte 24 Stunden",
        distribucion_magnitudes: "Verteilung der Magnituden",
        numero_terremotos_label_y: "Anzahl der Erdbeben",
        magnitud_label_x_magnitude: "Magnitude",
        magnitud_tiempo: "Magnitude im Zeitverlauf",
        magnitud_tiempo_chart_title: "Erdbebenmagnitude im Zeitverlauf",
        fecha_label_x_timeseries: "Datum",
        magnitud_label_y_timeseries: "Magnitude",
        distribucion_profundidad: "Tiefenverteilung",
        distribucion_profundidad_chart_title: "Erdbebenverteilung nach Tiefe",
        ultimos_terremotos: "Letzte Erdbeben",
        noticias_sismicas: "Seismische Nachrichten",
		latest_quake_magnitude: "Magnitude",
        no_noticias: "Keine aktuellen Nachrichten verfügbar.",
        consejos_seguridad: "Sicherheitstipps",
        antes_terremoto: "Vor dem Beben",
        durante_terremoto: "Während des Bebens",
        despues_terremoto: "Nach dem Beben",
        kit_emergencia: "Notfallausrüstung",
        recursos_educativos: "Bildungsressourcen",
        texto_recursos_videos: "Erfahren Sie mehr über Erdbeben und wie Sie sich vorbereiten können.",
        ver_videos: "Videos Ansehen",
        texto_recursos_guia: "Laden Sie unseren umfassenden Leitfaden zur Erdbebenvorsorge herunter.",
        descargar_pdf: "PDF Herunterladen",
        copyright: "© %{year} Globales Seismisches Informationszentrum. Alle Rechte vorbehalten.",
        alerta_titulo: "Wichtige Erdbebenwarnung!",
        alerta_significativo: "WICHTIGES Erdbeben der Magnitude %{magnitude} in %{lugar} entdeckt! Überprüfen Sie die Karte und bleiben Sie informiert.",
        alerta_cercano: "Mögliches Erdbeben in der Nähe! Beben der Magnitude %{magnitude} in der Nähe Ihres Standorts entdeckt.",
        popup_magnitud: "Magnitude",
        popup_ubicacion: "Ort",
        popup_profundidad: "Tiefe",
        popup_fecha: "Datum",
        leer_mas: "Mehr Lesen",
        antes_terremoto_detalles: "Sichern Sie hohe Gegenstände, bereiten Sie eine Notfallausrüstung vor und erstellen Sie einen Familienplan.",
        durante_terremoto_detalles: "Gehen Sie unter einen stabilen Tisch, bleiben Sie fern von Fenstern und Außenwänden.",
        despues_terremoto_detalles: "Überprüfen Sie auf Verletzungen, inspizieren Sie Gas und Elektrizität, erwarten Sie Nachbeben.",
        kit_emergencia_detalles: "Wasser, haltbare Lebensmittel, Radio, Taschenlampe, Erste-Hilfe-Set.",
        distribucion_magnitudes_chart_title: "Verteilung der Magnituden",
        distribucion_profundidad_chart_title: "Tiefenverteilung"
    },
    it: {
        titulo_pagina: "Centro di Informazione Sismica Globale",
        titulo_principal: "Informazioni Globali sui Terremoti a Portata di Mano",
        texto_principal: "Rimani aggiornato con gli ultimi dati sismici e impara come proteggere te stesso e i tuoi cari.",
        boton_mapa: "Visualizza Mappa Interattiva",
        inicio: "Home",
        estadisticas: "Statistiche",
        noticias: "Notizie",
        consejos: "Consigli",
        mapa_terremotos: "Mappa dei Terremoti Recenti",
        magnitud_minima: "Magnitudo Minima:",
        periodo: "Periodo di Tempo:",
        ultima_hora: "Ultima Ora",
        ultimo_dia: "Ultimo Giorno",
        ultima_semana: "Ultima Settimana",
        ultimo_mes: "Ultimo Mese",
        estilo_mapa: "Stile Mappa:",
        calles: "Strade",
        satelite: "Satellite",
        terreno: "Terreno",
        estadisticas_terremotos: "Statistiche Terremoti",
        total: "Totale",
        promedio: "Media",
        maximo: "Massimo",
        ultimas_24h: "Ultime 24 Ore",
        distribucion_magnitudes: "Distribuzione delle Magnitudo",
        numero_terremotos_label_y: "Numero di Terremoti",
        magnitud_label_x_magnitude: "Magnitudo",
        magnitud_tiempo: "Magnitudo nel Tempo",
        magnitud_tiempo_chart_title: "Magnitudo dei Terremoti nel Tempo",
        fecha_label_x_timeseries: "Data",
        magnitud_label_y_timeseries: "Magnitudo",
        distribucion_profundidad: "Distribuzione della Profondità",
        distribucion_profundidad_chart_title: "Distribuzione dei Terremoti per Profondità",
        ultimos_terremotos: "Ultimi Terremoti",
        noticias_sismicas: "Notizie Sismiche",
		latest_quake_magnitude: "Magnitudo",
        no_noticias: "Nessuna notizia recente da mostrare.",
        consejos_seguridad: "Consigli di Sicurezza",
        antes_terremoto: "Prima",
        durante_terremoto: "Durante",
        despues_terremoto: "Dopo",
        kit_emergencia: "Kit di Emergenza",
        recursos_educativos: "Risorse Educative",
        texto_recursos_videos: "Scopri di più sui terremoti e come prepararsi.",
        ver_videos: "Guarda Video",
        texto_recursos_guia: "Scarica la nostra guida completa alla preparazione ai terremoti.",
        descargar_pdf: "Scarica PDF",
        copyright: "© %{year} Centro di Informazione Sismica Globale. Tutti i diritti riservati.",
        alerta_titulo: "Allerta Terremoto Significativo!",
        alerta_significativo: "Terremoto SIGNIFICATIVO di magnitudo %{magnitude} rilevato in %{lugar}! Controlla la mappa e rimani informato.",
        alerta_cercano: "Possibile terremoto nelle vicinanze! Tremore di magnitudo %{magnitude} rilevato vicino alla tua posizione.",
        popup_magnitud: "Magnitudo",
        popup_ubicacion: "Posizione",
        popup_profundidad: "Profondità",
        popup_fecha: "Data",
        leer_mas: "Leggi di più",
        antes_terremoto_detalles: "Metti in sicurezza oggetti alti, prepara un kit di emergenza e stabilisci un piano familiare.",
        durante_terremoto_detalles: "Mettiti sotto un tavolo robusto, stai lontano da finestre e muri esterni.",
        despues_terremoto_detalles: "Verifica se ci sono feriti, controlla gas ed elettricità, aspetta scosse di assestamento.",
        kit_emergencia_detalles: "Acqua, cibo non deperibile, radio, torcia, kit di pronto soccorso.",
        distribucion_magnitudes_chart_title: "Distribuzione delle Magnitudo",
        distribucion_profundidad_chart_title: "Distribuzione della Profondità"
    },
    zh: {
        titulo_pagina: "全球地震信息中心",
        titulo_principal: "触手可及的全球地震信息",
        texto_principal: "随时了解最新的地震数据，学习如何保护自己和您的亲人。",
        boton_mapa: "查看互动地图",
        inicio: "首页",
        estadisticas: "统计数据",
        noticias: "新闻",
        consejos: "提示",
        mapa_terremotos: "近期地震地图",
        magnitud_minima: "最小震级：",
        periodo: "时间段：",
        ultima_hora: "最近一小时",
        ultimo_dia: "最近一天",
        ultima_semana: "最近一周",
        ultimo_mes: "最近一月",
        estilo_mapa: "地图样式：",
        calles: "街道",
        satelite: "卫星",
        terreno: "地形",
        estadisticas_terremotos: "地震统计",
        total: "总计",
        promedio: "平均值",
        maximo: "最大值",
        ultimas_24h: "最近 24 小时",
        distribucion_magnitudes: "震级分布",
        numero_terremotos_label_y: "地震数量",
        magnitud_label_x_magnitude: "震级",
        magnitud_tiempo: "随时间变化的震级",
        magnitud_tiempo_chart_title: "随时间变化的地震震级",
        fecha_label_x_timeseries: "日期",
        magnitud_label_y_timeseries: "震级",
        distribucion_profundidad: "深度分布",
        distribucion_profundidad_chart_title: "按深度划分的地震分布",
        ultimos_terremotos: "最新地震",
        noticias_sismicas: "地震新闻",
		latest_quake_magnitude: "震级",
        no_noticias: "没有最新消息可显示。",
        consejos_seguridad: "安全提示",
        antes_terremoto: "地震前",
        durante_terremoto: "地震期间",
        despues_terremoto: "地震后",
        kit_emergencia: "紧急工具包",
        recursos_educativos: "教育资源",
        texto_recursos_videos: "了解更多关于地震以及如何做好准备的信息。",
        ver_videos: "观看视频",
        texto_recursos_guia: "下载我们完整的地震准备指南。",
        descargar_pdf: "下载 PDF",
        copyright: "© %{year} 全球地震信息中心。保留所有权利。",
        alerta_titulo: "重大地震警报！",
        alerta_significativo: "在 %{lugar} 检测到 %{magnitude} 级【重大】地震！查看地图并随时了解情况。",
        alerta_cercano: "附近可能有地震！在您所在位置附近检测到 %{magnitude} 级震动。",
        popup_magnitud: "震级",
        popup_ubicacion: "位置",
        popup_profundidad: "深度",
        popup_fecha: "日期",
        leer_mas: "阅读更多",
        antes_terremoto_detalles: "固定高大的物体，准备一个急救包，并制定家庭计划。",
        durante_terremoto_detalles: "躲在坚固的桌子下，远离窗户和外墙。",
        despues_terremoto_detalles: "检查是否有人受伤，检查煤气和电力，预计会有余震。",
        kit_emergencia_detalles: "水、不易腐烂的食物、收音机、手电筒、急救箱。",
        distribucion_magnitudes_chart_title: "震级分布",
        distribucion_profundidad_chart_title: "深度分布"
    },
    ja: {
        titulo_pagina: "グローバル地震情報センター",
        titulo_principal: "手のひらでわかる世界の地震情報",
        texto_principal: "最新の地震データを入手し、自分自身と愛する人を守る方法を学びましょう。",
        boton_mapa: "インタラクティブマップを見る",
        inicio: "ホーム",
        estadisticas: "統計",
        noticias: "ニュース",
        consejos: "ヒント",
        mapa_terremotos: "最近の地震マップ",
        magnitud_minima: "最小マグニチュード：",
        periodo: "期間：",
        ultima_hora: "過去1時間",
        ultimo_dia: "過去24時間",
        ultima_semana: "過去1週間",
        ultimo_mes: "過去1ヶ月",
        estilo_mapa: "マップスタイル：",
        calles: "ストリート",
        satelite: "衛星",
        terreno: "地形",
        estadisticas_terremotos: "地震統計",
        total: "合計",
        promedio: "平均",
        maximo: "最大",
        ultimas_24h: "過去24時間",
        distribucion_magnitudes: "マグニチュード分布",
        numero_terremotos_label_y: "地震数",
        magnitud_label_x_magnitude: "マグニチュード",
        magnitud_tiempo: "時間経過に伴うマグニチュード",
        magnitud_tiempo_chart_title: "時間経過に伴う地震マグニチュード",
        fecha_label_x_timeseries: "日付",
        magnitud_label_y_timeseries: "マグニチュード",
        distribucion_profundidad: "深度分布",
        distribucion_profundidad_chart_title: "深度別の地震分布",
        ultimos_terremotos: "最新の地震",
        noticias_sismicas: "地震ニュース",
		latest_quake_magnitude: "マグニチュード",
        no_noticias: "表示する最新ニュースはありません。",
        consejos_seguridad: "安全のヒント",
        antes_terremoto: "地震の前",
        durante_terremoto: "地震中",
        despues_terremoto: "地震後",
        kit_emergencia: "非常用キット",
        recursos_educativos: "教育リソース",
        texto_recursos_videos: "地震と準備方法についてもっと学びましょう。",
        ver_videos: "ビデオを見る",
        texto_recursos_guia: "地震対策ガイドをダウンロードしてください。",
        descargar_pdf: "PDFをダウンロード",
        copyright: "© %{year} グローバル地震情報センター。無断複写・転載を禁じます。",
        alerta_titulo: "重大な地震アラート！",
        alerta_significativo: "%{lugar}でマグニチュード%{magnitude}の【重大な】地震を検知しました！地図を確認して、最新情報を入手してください。",
        alerta_cercano: "近くで地震の可能性！あなたの位置付近でマグニチュード%{magnitude}の揺れを検知しました。",
        popup_magnitud: "マグニチュード",
        popup_ubicacion: "場所",
        popup_profundidad: "深さ",
        popup_fecha: "日付",
        leer_mas: "続きを読む",
        antes_terremoto_detalles: "背の高いものを固定し、非常用キットを用意し、家族計画を立ててください。",
        durante_terremoto_detalles: "丈夫なテーブルの下に隠れ、窓や外壁から離れてください。",
        despues_terremoto_detalles: "負傷者がいないか確認し、ガスと電気を点検し、余震に備えてください。",
        kit_emergencia_detalles: "水、保存食、ラジオ、懐中電灯、応急処置キット。",
        distribucion_magnitudes_chart_title: "マグニチュード分布",
        distribucion_profundidad_chart_title: "深度分布"
    },
     de: {
        titulo_pagina: "Globales Seismisches Informationszentrum",
        titulo_principal: "Globale Erdbebeninformationen zum Greifen nah",
        texto_principal: "Bleiben Sie auf dem Laufenden mit den neuesten seismischen Daten und lernen Sie, wie Sie sich und Ihre Lieben schützen können.",
        boton_mapa: "Interaktive Karte Anzeigen",
        inicio: "Startseite",
        estadisticas: "Statistiken",
        noticias: "Nachrichten",
        consejos: "Tipps",
        mapa_terremotos: "Karte der Letzten Erdbeben",
        magnitud_minima: "Mindestmagnitude:",
        periodo: "Zeitraum:",
        ultima_hora: "Letzte Stunde",
        ultimo_dia: "Letzter Tag",
        ultima_semana: "Letzte Woche",
        ultimo_mes: "Letzter Monat",
        estilo_mapa: "Kartenstil:",
        calles: "Straßen",
        satelite: "Satellit",
        terreno: "Gelände",
        estadisticas_terremotos: "Erdbebenstatistiken",
        total: "Gesamt",
        promedio: "Durchschnitt",
        maximo: "Maximum",
        ultimas_24h: "Letzte 24 Stunden",
        distribucion_magnitudes: "Verteilung der Magnituden",
        numero_terremotos_label_y: "Anzahl der Erdbeben",
        magnitud_label_x_magnitude: "Magnitude",
        magnitud_tiempo: "Magnitude im Zeitverlauf",
        magnitud_tiempo_chart_title: "Erdbebenmagnitude im Zeitverlauf",
        fecha_label_x_timeseries: "Datum",
        magnitud_label_y_timeseries: "Magnitude",
        distribucion_profundidad: "Tiefenverteilung",
        distribucion_profundidad_chart_title: "Erdbebenverteilung nach Tiefe",
        ultimos_terremotos: "Letzte Erdbeben",
        noticias_sismicas: "Seismische Nachrichten",
		latest_quake_magnitude: "Magnitude",
        no_noticias: "Keine aktuellen Nachrichten verfügbar.",
        consejos_seguridad: "Sicherheitstipps",
        antes_terremoto: "Vor dem Beben",
        durante_terremoto: "Während des Bebens",
        despues_terremoto: "Nach dem Beben",
        kit_emergencia: "Notfallausrüstung",
        recursos_educativos: "Bildungsressourcen",
        texto_recursos_videos: "Erfahren Sie mehr über Erdbeben und wie Sie sich vorbereiten können.",
        ver_videos: "Videos Ansehen",
        texto_recursos_guia: "Laden Sie unseren umfassenden Leitfaden zur Erdbebenvorsorge herunter.",
        descargar_pdf: "PDF Herunterladen",
        copyright: "© %{year} Globales Seismisches Informationszentrum. Alle Rechte vorbehalten.",
        alerta_titulo: "Wichtige Erdbebenwarnung!",
        alerta_significativo: "WICHTIGES Erdbeben der Magnitude %{magnitude} in %{lugar} entdeckt! Überprüfen Sie die Karte und bleiben Sie informiert.",
        alerta_cercano: "Mögliches Erdbeben in der Nähe! Beben der Magnitude %{magnitude} in der Nähe Ihres Standorts entdeckt.",
        popup_magnitud: "Magnitude",
        popup_ubicacion: "Ort",
        popup_profundidad: "Tiefe",
        popup_fecha: "Datum",
        leer_mas: "Mehr Lesen",
        antes_terremoto_detalles: "Sichern Sie hohe Gegenstände, bereiten Sie eine Notfallausrüstung vor und erstellen Sie einen Familienplan.",
        durante_terremoto_detalles: "Gehen Sie unter einen stabilen Tisch, bleiben Sie fern von Fenstern und Außenwänden.",
        despues_terremoto_detalles: "Überprüfen Sie auf Verletzungen, inspizieren Sie Gas und Elektrizität, erwarten Sie Nachbeben.",
        kit_emergencia_detalles: "Wasser, haltbare Lebensmittel, Radio, Taschenlampe, Erste-Hilfe-Set.",
        distribucion_magnitudes_chart_title: "Verteilung der Magnituden",
        distribucion_profundidad_chart_title: "Tiefenverteilung"

    },
    it: {
        titulo_pagina: "Centro di Informazione Sismica Globale",
        titulo_principal: "Informazioni Globali sui Terremoti a Portata di Mano",
        texto_principal: "Rimani aggiornato con gli ultimi dati sismici e impara come proteggere te stesso e i tuoi cari.",
        boton_mapa: "Visualizza Mappa Interattiva",
        inicio: "Home",
        estadisticas: "Statistiche",
        noticias: "Notizie",
        consejos: "Consigli",
        mapa_terremotos: "Mappa dei Terremoti Recenti",
        magnitud_minima: "Magnitudo Minima:",
        periodo: "Periodo di Tempo:",
        ultima_hora: "Ultima Ora",
        ultimo_dia: "Ultimo Giorno",
        ultima_semana: "Ultima Settimana",
        ultimo_mes: "Ultimo Mese",
        estilo_mapa: "Stile Mappa:",
        calles: "Strade",
        satelite: "Satellite",
        terreno: "Terreno",
        estadisticas_terremotos: "Statistiche Terremoti",
        total: "Totale",
        promedio: "Media",
        maximo: "Massimo",
        ultimas_24h: "Ultime 24 Ore",
        distribucion_magnitudes: "Distribuzione delle Magnitudo",
        numero_terremotos_label_y: "Numero di Terremoti",
        magnitud_label_x_magnitude: "Magnitudo",
        magnitud_tiempo: "Magnitudo nel Tempo",
        magnitud_tiempo_chart_title: "Magnitudo dei Terremoti nel Tempo",
        fecha_label_x_timeseries: "Data",
        magnitud_label_y_timeseries: "Magnitudo",
        distribucion_profundidad: "Distribuzione della Profondità",
        distribucion_profundidad_chart_title: "Distribuzione dei Terremoti per Profondità",
        ultimos_terremotos: "Ultimi Terremoti",
        noticias_sismicas: "Notizie Sismiche",
		latest_quake_magnitude: "Magnitudo",
        no_noticias: "Nessuna notizia recente da mostrare.",
        consejos_seguridad: "Consigli di Sicurezza",
        antes_terremoto: "Prima",
        durante_terremoto: "Durante",
        despues_terremoto: "Dopo",
        kit_emergencia: "Kit di Emergenza",
        recursos_educativos: "Risorse Educative",
        texto_recursos_videos: "Scopri di più sui terremoti e come prepararsi.",
        ver_videos: "Guarda Video",
        texto_recursos_guia: "Scarica la nostra guida completa alla preparazione ai terremoti.",
        descargar_pdf: "Scarica PDF",
        copyright: "© %{year} Centro di Informazione Sismica Globale. Tutti i diritti riservati.",
        alerta_titulo: "Allerta Terremoto Significativo!",
        alerta_significativo: "Terremoto SIGNIFICATIVO di magnitudo %{magnitude} rilevato in %{lugar}! Controlla la mappa e rimani informato.",
        alerta_cercano: "Possibile terremoto nelle vicinanze! Tremore di magnitudo %{magnitude} rilevato vicino alla tua posizione.",
        popup_magnitud: "Magnitudo",
        popup_ubicacion: "Posizione",
        popup_profundidad: "Profondità",
        popup_fecha: "Data",
        leer_mas: "Leggi di più",
        antes_terremoto_detalles: "Metti in sicurezza oggetti alti, prepara un kit di emergenza e stabilisci un piano familiare.",
        durante_terremoto_detalles: "Mettiti sotto un tavolo robusto, stai lontano da finestre e muri esterni.",
        despues_terremoto_detalles: "Verifica se ci sono feriti, controlla gas ed elettricità, aspetta scosse di assestamento.",
        kit_emergencia_detalles: "Acqua, cibo non deperibile, radio, torcia, kit di pronto soccorso.",
        distribucion_magnitudes_chart_title: "Distribuzione delle Magnitudo",
        distribucion_profundidad_chart_title: "Distribuzione della Profondità"
    }
};

function translatePage(language) {
    console.log("Función translatePage llamada con el idioma:", language); // Función translatePage llamada con el idioma:

    const elements = document.querySelectorAll('[data-i18n]');
    console.log("Elementos encontrados con data-i18n:", elements.length); // Elementos encontrados con data-i18n:

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        console.log("  Traducción del elemento con la clave:", key); //   Traducción del elemento con la clave:
        if (translations[language] && translations[language][key]) {
            let translation = translations[language][key];
            if (key === 'copyright') {
                translation = translation.replace('%{year}', new Date().getFullYear());
            }
            element.textContent = translation;
            if (element.placeholder) {
                element.placeholder = translation;
            }
        } else {
            console.log("Traducción no encontrada para la clave:", key, "en el idioma:", language); //   Traducción no encontrada para la clave:, en el idioma:
        }
    });

    // **RE-TRADUCIR EL MENSAJE DE ALERTA SI ACTIVO - DEPURACIÓN ULTRA-DETALLADA**
    const alertElement = document.getElementById('earthquakeAlert');
    if (!alertElement.classList.contains('hidden')) {
        console.log("  Alerta activa detectada, re-traducción del mensaje en curso..."); //   Alerta activa detectada, re-traducción del mensaje en curso...
        const alertDetails = document.getElementById('alertDetails');
        let alertMessage = alertDetails.textContent;
        console.log("    Mensaje de alerta actual (antes de la re-traducción):", alertMessage); //     Mensaje de alerta actual (antes de la re-traducción):

        // Determinar si es alerta significativa o cercana
        if (alertMessage.includes(translations[document.getElementById('language-selector').value].alerta_significativo.split(' ')[0])) {
            console.log("    Tipo de alerta detectado: Alerta Significativa"); //     Tipo de alerta detectado: Alerta Significativa
            // Re-generar mensaje de alerta significativa traducido
            const currentEarthquakeMag = alertMessage.match(/[\d.]+/)[0];
            const currentEarthquakePlace = alertMessage.substring(alertMessage.indexOf('en') + 3).split('!')[0].trim();

            console.log("    Magnitud extraída del mensaje actual:", currentEarthquakeMag); //     Magnitud extraída del mensaje actual:
            console.log("    Ubicación extraída del mensaje actual:", currentEarthquakePlace); //     Ubicación extraída del mensaje actual:
            console.log("    Etiqueta traducida 'Magnitude':", translations[language].popup_magnitud); //     Etiqueta traducida 'Magnitude':
            console.log("    Etiqueta traducida 'Ubicación':", translations[language].popup_ubicacion); //     Etiqueta traducida 'Ubicación':


            let translatedAlertMessage = translations[language].alerta_significativo
                .replace('%{magnitude}', translations[language].popup_magnitud + " " + currentEarthquakeMag)
                .replace('%{lugar}', translations[language].popup_ubicacion + " " + currentEarthquakePlace);

            alertDetails.textContent = translatedAlertMessage;
            console.log("    Mensaje de alerta significativa re-traducido (ES):", translatedAlertMessage); //     Mensaje de alerta significativa re-traducido (ES):

        } else if (alertMessage.includes(translations[document.getElementById('language-selector').value].alerta_cercano.split(' ')[0])) {
            console.log("    Tipo de alerta detectado: Alerta Cercana"); //     Tipo de alerta detectado: Alerta Cercana
            // Re-generar mensaje de alerta cercana traducido
            const currentNearbyEarthquakeMag = alertMessage.match(/[\d.]+/)[0];
            console.log("    Magnitud extraída del mensaje actual (alerta cercana):", currentNearbyEarthquakeMag); //     Magnitud extraída del mensaje actual (alerta cercana):
            console.log("    Etiqueta traducida 'Magnitude':", translations[language].popup_magnitud); //     Etiqueta traducida 'Magnitude':

            let translatedAlertCercanoMessage = translations[language].alerta_cercano
                .replace('%{magnitude}', translations[language].popup_magnitud + " " + currentNearbyEarthquakeMag);

            alertDetails.textContent = translatedAlertCercanoMessage;
            console.log("    Mensaje de alerta cercana re-traducido (ES):", translatedAlertCercanoMessage); //     Mensaje de alerta cercana re-traducido (ES):
        } else {
            console.warn("    Tipo de mensaje de alerta no reconocido para la re-traducción."); //     Tipo de mensaje de alerta no reconocido para la re-traducción.
        }
    }

    // Re-renderizar los gráficos y el mapa (sin cambios)
    if (currentEarthquakesData) {
        createMagnitudeChart(currentEarthquakesData);
        createTimeSeriesChart(currentEarthquakesData);
        createDepthChart(currentEarthquakesData);
        displayEarthquakes(currentEarthquakesData, parseFloat(document.getElementById('magnitudeFilter').value));
    }

    console.log("Función translatePage terminada para el idioma:", language); // Función translatePage terminada para el idioma:
}

function showTipDetails(tip) {
    let detailsKey = '';
    let tipTitleKey = '';
    switch (tip) {
        case 'Antes del Terremoto':
            detailsKey = 'antes_terremoto_detalles';
            tipTitleKey = 'antes_terremoto';
            break;
        case 'Durante del Terremoto':
            detailsKey = 'durante_terremoto_detalles';
            tipTitleKey = 'durante_terremoto';
            break;
        case 'Después del Terremoto':
            detailsKey = 'despues_terremoto_detalles';
            tipTitleKey = 'despues_terremoto';
            break;
        case 'Kit de Emergencia':
            detailsKey = 'kit_emergencia_detalles';
            tipTitleKey = 'kit_emergencia';
            break;
    }

    const currentLanguage = document.getElementById('language-selector').value;

    const translatedDetails = translations[currentLanguage][detailsKey];
    const translatedTipTitle = translations[currentLanguage][tipTitleKey];

    alert(`${translatedTipTitle}:\n\n${translatedDetails}`);
}

function initializeMap() {
    map = L.map('earthquakeMap').setView([0, 0], 2);
    updateMapStyle();
    markerClusterGroup = L.markerClusterGroup().addTo(map);
}

function updateMapStyle() {
    const style = document.getElementById('mapStyle').value;
    let tileLayer;
    switch (style) {
        case 'satellite':
            tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            });
            break;
        case 'terrain':
            tileLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data: © <a href = "https://www.openstreetmap.org/copyright" > OpenStreetMap </a> contributors, <a href = "http://viewfinderpanoramas.org" > SRTM </a> | Map style: ©<a href = "https://opentopomap.org" > OpenTopoMap </a> ( <a href = "https://creativecommons.org/licenses/by-sa/3.0/" > CC - BY - SA </a>)'
            });
            break;
        default: // 'streets'
            tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href = "https://www.openstreetmap.org/copyright" > OpenStreetMap </a> contributors'
            });
    }
    if (map.hasLayer(map._baseLayer)) {
        map.removeLayer(map._baseLayer);
    }
    tileLayer.addTo(map);
    map._baseLayer = tileLayer;
}

async function fetchEarthquakeData(timePeriod) {
    const response = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timePeriod}.geojson`);
    const data = await response.json();
    return data.features;
}

function updateStatistics(earthquakes) {
    const magnitudes = earthquakes.map(eq => eq.properties.mag).filter(mag => mag !== null);
    const total = magnitudes.length;
    const avg = magnitudes.reduce((a, b) => a + b, 0) / total;
    const max = Math.max(...magnitudes);
    const recent = earthquakes.filter(eq => (Date.now() - eq.properties.time) <= 86400000).length;
    document.getElementById('totalQuakes').textContent = total;
    document.getElementById('avgMagnitude').textContent = avg.toFixed(2);
    document.getElementById('maxMagnitude').textContent = max.toFixed(1);
    document.getElementById('recentQuakes').textContent = recent;
}

function displayEarthquakes(earthquakes, magnitudeThreshold) {
    markerClusterGroup.clearLayers();
    earthquakes.forEach(eq => {
        const magnitude = eq.properties.mag;
        const coords = eq.geometry.coordinates;
        if (magnitude !== null && magnitude >= magnitudeThreshold) {
            const currentLanguage = document.getElementById('language-selector').value;
            const marker = L.circleMarker([coords[1], coords[0]], {
                radius: Math.max(magnitude * 2, 5),
                fillColor: getColorByMagnitude(magnitude),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`
                <strong>${translations[currentLanguage].popup_magnitud}</strong> ${magnitude}
                <br>
                <strong>${translations[currentLanguage].popup_ubicacion}</strong> ${eq.properties.place}
                <br>
                <strong>${translations[currentLanguage].popup_profundidad}</strong> ${coords[2]} km
                <br>
                <strong>${translations[currentLanguage].popup_fecha}</strong> ${new Date(eq.properties.time).toLocaleString()}
            `); // Popups traducidos aquí usando translations[currentLanguage].popup_...
            markerClusterGroup.addLayer(marker);
        }
    });
    if (markerClusterGroup.getLayers().length > 0) {
        map.fitBounds(markerClusterGroup.getBounds());
    }
}

function getColorByMagnitude(magnitude) {
    if (magnitude < 2) return '#2ecc71';
    if (magnitude < 4) return '#f1c40f';
    if (magnitude < 6) return '#e67e22';
    return '#e74c3c';
}

function createMagnitudeChart(earthquakes) {
    const ctx = document.getElementById('magnitudeChart').getContext('2d');
    const magnitudeCounts = {};
    earthquakes.forEach(eq => {
        const magnitude = Math.floor(eq.properties.mag);
        magnitudeCounts[magnitude] = (magnitudeCounts[magnitude] || 0) + 1;
    });
    const labels = Object.keys(magnitudeCounts).sort((a, b) => a - b);
    const data = labels.map(label => magnitudeCounts[label]);
    const currentLanguage = document.getElementById('language-selector').value;

    if (magnitudeChart) {
        magnitudeChart.destroy();
    }
    magnitudeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: translations[currentLanguage].numero_terremotos_label_y,
                data: data,
                backgroundColor: 'rgba(220, 20, 60, 0.75)',
                borderColor: '#DC143C',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            backgroundColor: 'transparent',
            color: '#f0f0f0',
            plugins: {
                title: {
                    display: true,
                    text: translations[currentLanguage].distribucion_magnitudes_chart_title, // Título traducido
                    font: {
                        size: 16,
                        color: '#f0f0f0'
                    }
                },
                legend: {
                    display: false,
                    labels: {
                        color: '#f0f0f0'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: translations[currentLanguage].numero_terremotos_label_y, // Eje Y traducido
                        color: '#f0f0f0'
                    },
                    ticks: {
                        color: '#f0f0f0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    border: {
                        color: '#f0f0f0'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: translations[currentLanguage].magnitud_label_x_magnitude, // Eje X traducido
                        color: '#f0f0f0'
                    },
                    ticks: {
                        color: '#f0f0f0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    border: {
                        color: '#f0f0f0'
                    }
                }
            }
        }
    });
}

function createTimeSeriesChart(earthquakes) {
    const ctx = document.getElementById('timeSeriesChart').getContext('2d');
    const data = earthquakes.map(eq => ({
        x: new Date(eq.properties.time),
        y: eq.properties.mag
    })).sort((a, b) => a.x - b.x);
    const currentLanguage = document.getElementById('language-selector').value;

    if (timeSeriesChart) {
        timeSeriesChart.destroy();
    }
    timeSeriesChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: translations[currentLanguage].magnitud_tiempo_chart_title, // Título traducido
                data: data,
                borderColor: 'rgba(220, 20, 60, 0.9)',
                backgroundColor: 'rgba(220, 20, 60, 0.25)',
                pointRadius: 3,
                pointHoverRadius: 5,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            backgroundColor: 'transparent',
            color: '#f0f0f0',
            plugins: {
                title: {
                    display: true,
                    text: translations[currentLanguage].magnitud_tiempo_chart_title, // Título traducido
                    font: {
                        size: 16,
                        color: '#f0f0f0'
                    }
                },
                legend: {
                    labels: {
                        color: '#f0f0f0'
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    title: {
                        display: true,
                        text: translations[currentLanguage].fecha_label_x_timeseries, // Eje X traducido
                        color: '#f0f0f0'
                    },
                    ticks: {
                        color: '#f0f0f0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    border: {
                        color: '#f0f0f0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: translations[currentLanguage].magnitud_label_y_timeseries, // Eje Y traducido
                        color: '#f0f0f0'
                    },
                    ticks: {
                        color: '#f0f0f0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    border: {
                        color: '#f0f0f0'
                    }
                }
            }
        }
    });
}

function createDepthChart(earthquakes) {
    const ctx = document.getElementById('depthChart').getContext('2d');
    const depthRanges = {
        '0-10 km': 0,
        '10-50 km': 0,
        '50-100 km': 0,
        '100-300 km': 0,
        '300+ km': 0
    };
    earthquakes.forEach(eq => {
        const depth = eq.geometry.coordinates[2];
        if (depth <= 10) depthRanges['0-10 km']++;
        else if (depth <= 50) depthRanges['10-50 km']++;
        else if (depth <= 100) depthRanges['50-100 km']++;
        else if (depth <= 300) depthRanges['100-300 km']++;
        else depthRanges['300+ km']++;
    });
    const currentLanguage = document.getElementById('language-selector').value;

    if (depthChart) {
        depthChart.destroy();
    }
    depthChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(depthRanges).map(range => { // Traducir las etiquetas de profundidad
                const rangeParts = range.split('-');
                if (rangeParts.length === 2) {
                    return `${rangeParts[0]}-${rangeParts[1]} km`; // No traducir "km"
                } else {
                    return `${range}`; // Para "300+ km", no traducir "km" ni "+"
                }
            }),
            datasets: [{
                data: Object.values(depthRanges),
                backgroundColor: [
                    'rgba(220, 20, 60, 0.85)',
                    'rgba(220, 20, 60, 0.7)',
                    'rgba(205, 92, 92, 0.8)',
                    'rgba(255, 69, 0, 0.7)',
                    'rgba(178, 34, 34, 0.7)'
                ],
                borderColor: 'transparent'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            backgroundColor: 'transparent',
            color: '#f0f0f0',
            plugins: {
                title: {
                    display: true,
                    text: translations[currentLanguage].distribucion_profundidad_chart_title, // Título traducido
                    font: {
                        size: 16,
                        color: '#f0f0f0'
                    }
                },
                legend: {
                    labels: {
                        color: '#f0f0f0'
                    }
                }
            } ,
            cutoutPercentage: 30
        }
    });
}


function updateLatestEarthquakes(earthquakes) {
    const latestList = document.getElementById('latestEarthquakes');
    latestList.innerHTML = '';
    earthquakes.slice(0, 10).forEach(eq => {
        const li = document.createElement('li');
        li.className = 'p-2 bg-dark-242323 rounded-lg mb-2';

        const magnitudeSpan = document.createElement('span');
        magnitudeSpan.className = 'font-semibold';
        magnitudeSpan.setAttribute('data-i18n', 'latest_quake_magnitude');
        magnitudeSpan.textContent = translations[document.getElementById('language-selector').value].latest_quake_magnitude || translations['es'].latest_quake_magnitude;

        const magnitudeValueSpan = document.createElement('span');
        magnitudeValueSpan.textContent = ` ${eq.properties.mag.toFixed(1)}`;

        const placeSpan = document.createElement('span');
        placeSpan.className = 'text-sm text-text-secondary';
        placeSpan.textContent = eq.properties.place;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'text-xs text-text-secondary';
        timeSpan.textContent = new Date(eq.properties.time).toLocaleString();

        li.appendChild(magnitudeSpan);
        li.appendChild(magnitudeValueSpan);
        li.appendChild(document.createElement('br'));
        li.appendChild(placeSpan);
        li.appendChild(document.createElement('br'));
        li.appendChild(timeSpan);

        latestList.appendChild(li);
    });

    const currentLanguage = document.getElementById('language-selector').value;
    translatePage(currentLanguage);
}

function checkForSignificantEarthquakes(earthquakes) {
    const significantEarthquake = earthquakes.find(eq => eq.properties.mag >= 6.0);
    if (significantEarthquake) {
        const alertElement = document.getElementById('earthquakeAlert');
        const alertDetails = document.getElementById('alertDetails');
        const currentLanguage = document.getElementById('language-selector').value;

        console.log("checkForSignificantEarthquakes: Idioma actual detectado:", currentLanguage);

        // **GENERAR EL MENSAJE DE ALERTA COMPLETAMENTE TRADUCIDO DESDE EL INICIO**
        let translatedAlertMessage = translations[currentLanguage].alerta_significativo
            .replace('%{magnitude}', translations[currentLanguage].popup_magnitud + " " + significantEarthquake.properties.mag.toFixed(1)) // Usar etiqueta traducida "Magnitud"
            .replace('%{lugar}', translations[currentLanguage].popup_ubicacion + " " + significantEarthquake.properties.place);     // Usar etiqueta traducida "Ubicación"

        console.log("checkForSignificantEarthquakes: Mensaje generado (traducido):", translatedAlertMessage);

        alertDetails.textContent = translatedAlertMessage;
        alertElement.classList.remove('hidden');
    } else {
        document.getElementById('earthquakeAlert').classList.add('hidden');
    }
}

async function fetchEarthquakeNews() {
    try {
        const response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson');
        const newsContainer = document.getElementById('newsContainer');
        newsContainer.innerHTML = '';
        const currentLanguage = document.getElementById('language-selector').value;
        response.data.features.slice(0, 5).forEach(feature => {
            const newsItem = document.createElement('div');
            newsItem.className = 'bg-dark-242323 p-4 rounded-lg mb-4';

            const newsTitle = document.createElement('h3');
            newsTitle.className = 'font-semibold mb-2';
            newsTitle.setAttribute('data-i18n', 'news_item_title_' + feature.id);
            newsTitle.textContent = feature.properties.title;

            const newsDate = document.createElement('p');
            newsDate.className = 'text-sm text-text-secondary';
            newsDate.setAttribute('data-i18n', 'news_item_date_' + feature.id);
            newsDate.textContent = new Date(feature.properties.time).toLocaleString();

            const readMoreLink = document.createElement('a');
            readMoreLink.href = feature.properties.url;
            readMoreLink.target = '_blank';
            readMoreLink.className = 'text-primary hover:underline mt-2 inline-block';
            readMoreLink.setAttribute('data-i18n', 'leer_mas');
            readMoreLink.textContent = translations[currentLanguage].leer_mas;


            newsItem.appendChild(newsTitle);
            newsItem.appendChild(newsDate);
            newsItem.appendChild(readMoreLink);

            newsContainer.appendChild(newsItem);
        });

        translatePage(currentLanguage);


    } catch (error) {
        console.error('Error fetching earthquake news:', error);
    }
}

function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            map.setView([userLocation.lat, userLocation.lon], 8);
        }, function(error) {
            console.error("Error getting user location:", error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

async function updateEarthquakeData() {
    const timePeriod = document.getElementById('timePeriod').value;
    const magnitudeThreshold = parseFloat(document.getElementById('magnitudeFilter').value);
    try {
        const earthquakes = await fetchEarthquakeData(timePeriod);
        currentEarthquakesData = earthquakes; // Guardar los datos en la variable global
        updateStatistics(earthquakes);
        displayEarthquakes(earthquakes, magnitudeThreshold);
        createMagnitudeChart(earthquakes);
        createTimeSeriesChart(earthquakes);
        createDepthChart(earthquakes);
        updateLatestEarthquakes(earthquakes);
        checkForSignificantEarthquakes(earthquakes);
        if (userLocation) {
            checkNearbyEarthquakes(earthquakes, userLocation);
        }
    } catch (error) {
        console.error('Error updating earthquake data:', error);
    }
}

function checkNearbyEarthquakes(earthquakes, location) {
    const nearbyEarthquake = earthquakes.find(eq => {
        const distance = getDistance(location.lat, location.lon, eq.geometry.coordinates[1], eq.geometry.coordinates[0]);
        return distance <= 100 && eq.properties.mag >= 4.0;
    });
    if (nearbyEarthquake) {
        const alertElement = document.getElementById('earthquakeAlert');
        const alertDetails = document.getElementById('alertDetails');
        const currentLanguage = document.getElementById('language-selector').value;

        console.log("checkNearbyEarthquakes: Idioma actual detectado:", currentLanguage);

        // **GENERAR EL MENSAJE DE ALERTA COMPLETAMENTE TRADUCIDO DESDE EL INICIO**
        let translatedAlertCercanoMessage = translations[currentLanguage].alerta_cercano
            .replace('%{magnitude}', translations[currentLanguage].popup_magnitud + " " + nearbyEarthquake.properties.mag.toFixed(1)); // Usar etiqueta traducida "Magnitud"


        console.log("checkNearbyEarthquakes: Mensaje generado (traducido):", translatedAlertCercanoMessage);

        alertDetails.textContent = translatedAlertCercanoMessage;
        alertElement.classList.remove('hidden');
    }
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function initializeControls() {
    const magnitudeFilter = document.getElementById('magnitudeFilter');
    const magnitudeValue = document.getElementById('magnitudeValue');
    const timePeriod = document.getElementById('timePeriod');
    const mapStyle = document.getElementById('mapStyle');
    magnitudeFilter.addEventListener('input', function() {
        magnitudeValue.textContent = this.value;
        updateEarthquakeData();
    });
    timePeriod.addEventListener('change', updateEarthquakeData);
    mapStyle.addEventListener('change', updateMapStyle);
}

async function initializePage() {
    try {
        initializeMap();
        initializeControls();

        getUserLocation(); // No await aquí para no bloquear la inicialización inicial del mapa
        updateEarthquakeData().then(() => { // Asegurar que updateEarthquakeData se complete antes de la traducción inicial
            const languageSelector = document.getElementById('language-selector');
            const defaultLanguage = 'es';
            languageSelector.value = defaultLanguage;
            translatePage(defaultLanguage); // Traducir la página INICIALMENTE DESPUÉS de cargar los datos
        });
        fetchEarthquakeNews(); // No await para noticias, pueden cargar en segundo plano

        setInterval(updateEarthquakeData, 300000);
        setInterval(fetchEarthquakeNews, 900000);

		const magnitudeFilter = document.getElementById('magnitudeFilter');
		const magnitudeValueSpan = document.getElementById('magnitudeValue');
		const maxMagnitudeValue = magnitudeFilter.max; // Obtener el valor máximo del atributo 'max'

		if (magnitudeFilter && magnitudeValueSpan) {
			magnitudeFilter.addEventListener('input', function() {
            magnitudeValueSpan.textContent = magnitudeFilter.value;
            // Calcular el porcentaje de relleno correctamente
            const fillPercentage = (magnitudeFilter.value / maxMagnitudeValue) * 100;
            magnitudeFilter.style.backgroundImage = `linear-gradient(to right, var(--black) 0%, var(--black) ${fillPercentage}%, var(--whiteSmoke) ${fillPercentage}%, var(--whiteSmoke) 100%)`;
        });
			// Inicializar el gradiente al cargar la página (valor inicial del slider)
			const initialFillPercentage = (magnitudeFilter.value / maxMagnitudeValue) * 100;
			magnitudeFilter.style.backgroundImage = `linear-gradient(to right, var(--black) 0%, var(--black) ${initialFillPercentage}%, var(--whiteSmoke) ${initialFillPercentage}%, var(--whiteSmoke) 100%)`;
		} else {
			console.error("No se encontraron los elementos magnitudeFilter o magnitudeValue. Verifica los IDs en tu HTML.");
		}

        const languageSelector = document.getElementById('language-selector');
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = languageSelector.value;
            translatePage(selectedLanguage); // Ahora translatePage re-renderiza graficas y mapa
        });

    } catch (error) {
        console.error('Error al inicializar la página:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializePage);