FROM python:3.12.11-alpine3.22
RUN addgroup app && adduser -S -G app app
WORKDIR /app
RUN chown app:app /app
USER app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN mkdir users-data
# CMD python manage.py runserver   این یه نحوه نوشتنه. پایینی هم نحوه دیگه.
# فرق کوچیکش اینه که لیستی بهینه تر اجرا میشه. چون اولی میره یه ترمینال جدید باز میکنه. شل اولیه
# سر جاش هست. در واقع ۲ تا شل هست که خب مقدار کمی حافظه میگیره. اما با لیست وقتی بهش میدیم
# میره تو همون ترمینال اصلی که باز هست اجراش میکنه.
EXPOSE 8000
# این اکسپوز یه جورایی برای برنامه نویسا هست که بدونن قراره داخل داکر رو این پورت اجرا بشه.
# اما دستور واقعی اجرا رو پورت ۸۰۰۰ همون دستوری هست که ران سرور توشه.
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
ENV STUDENT_NAME="Mohammad Fallah"
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]