ALTER TABLE public.feedback DROP CONSTRAINT feedback_customer_id_fkey;
ALTER TABLE public.feedback DROP CONSTRAINT feedback_xebian_id_fkey;
ALTER TABLE public.feedback DROP CONSTRAINT feedback_impact_id_fkey;
ALTER TABLE public.impact DROP CONSTRAINT impact_xebian_id_fkey;
ALTER TABLE public.impact DROP CONSTRAINT impact_customer_id_fkey;
DROP TABLE public.feedback;
DROP TABLE public.impact;
DROP TABLE public.xebian;
DROP TABLE public.customer;
