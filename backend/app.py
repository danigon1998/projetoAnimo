from multiprocessing import freeze_support
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from googletrans import Translator

def create_app():
    #Configurar app
    app = Flask(__name__)
    CORS(app)
    return app

def load_model():
    #Carregar o modelo
    return pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None)

def translate_text(text, dest_lang='en'):
    #Fazer a tradução para o idioma desejado (ingles neste caso)
    translator = Translator()
    return translator.translate(text, dest=dest_lang).text

if __name__ == '__main__':
    #usado em windows
    freeze_support()

    try:
        # Inicializar recursos
        emotion_classifier = load_model()
        app = create_app()
    except Exception as e:
        print(f"Error al inicializar recursos: {e}")
        exit(1)

    @app.route('/predict', methods=['POST'])
    def emotion_analyze():
        try:
            # Obter os dados do corpo da solitude
            data = request.get_json()

            if not data or "texto" not in data:
                return jsonify({"error": "Falta o campo 'texto' no corpo da solicitude"}), 400

            # Traducción al inglés
            texto_original = data["texto"]
            texto_traducido = translate_text(texto_original, dest_lang='en')

            # Análisis das emoções
            resultados = emotion_classifier(texto_traducido)

            # Preparar a resposta con emoções traduzidas
            emociones = []
            for resultado in resultados[0]:
                emocion_traducida = translate_text(resultado['label'], dest_lang='es')
                emociones.append({
                    "emotion": emocion_traducida,
                    "score": resultado['score']
                })

            # Selecionar a emoção com melhor pontuação
            emocion_mas_alta = max(emociones, key=lambda x: x['score'])

            return jsonify(emocion_mas_alta["emotion"]), 200

        except Exception as e:
            print(f"Erro durante o análisis: {e}")
            return jsonify({"error": "Erro interno do servidor"}), 500

    # Iniciar la aplicación Flask
    app.run(debug=True, host='0.0.0.0')
